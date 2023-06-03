import React from "react";
import {
  usePostCreateListMutation,
  usePostAddMovieToListMutation,
  usePostRemoveMovieFromListMutation,
} from "@/redux/api/lists/slice";
import { useLazyGetMovieDiscoverQuery } from "@/redux/api/discover/slice";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Result,
  Select,
  Spin,
  Steps,
  Typography,
  message,
} from "antd";
import { ListMovie } from "@/redux/api/movies/types/ListMovieType";
import Link from "next/link";
import Image from "next/image";
import RatingBar from "../UI/RatingBar/RatingBar";
import OptionElement from "../UI/OptionElement/OptionElement";
import { LoadingOutlined, CloseOutlined } from "@ant-design/icons";
import { formatReleaseDate } from "@/utils/formatReleaseDate";

import styles from "./ListNewBlock.module.scss";
import WideMovieCard from "../UI/WideMovieCard/WideMovieCard";
interface NewList {
  name: string;
  description: string;
  private: true | undefined;
  id: number;
}

const ListNewBlock = () => {
  const [createList, { data, isLoading }] = usePostCreateListMutation();
  const [
    searchMulti,
    { data: searchMovieData, isFetching: isSearchMovieFetching },
  ] = useLazyGetMovieDiscoverQuery();
  const [
    addMovieToList,
    { data: addMovieToListResult, isLoading: isAddMovieToListLoading },
  ] = usePostAddMovieToListMutation();
  const [
    removeMovieFromList,
    {
      data: removeMovieFromlistResult,
      isLoading: isRemoveMovieFromListLoading,
    },
  ] = usePostRemoveMovieFromListMutation();

  const [sessionId, setSessionId] = React.useState<string | null>("");
  const [newList, setNewList] = React.useState<NewList | null>(null);
  const [inputText, setInputText] = React.useState<string>("");
  const [selectedElements, setSelectedElements] = React.useState<ListMovie[]>();
  const [elementsOptions, setElementsOptions] = React.useState<ListMovie[]>([]);
  const [current, setCurrent] = React.useState(0);

  const [formStep1] = Form.useForm();
  const [formStep2] = Form.useForm();
  const [messageApi, contextMessageHolder] = message.useMessage();

  const onClickFinishStep1 = (values: any) => {
    createList({
      session_id: sessionId,
      name: values.name,
      description: values.description,
    })
      .unwrap()
      .then((data) => setNewList({ ...values, id: data.list_id }));

    onClickNext();
  };

  const onClickFinishStep2 = (values: any) => {
    createList({
      session_id: sessionId,
      name: values.name,
      description: values.description,
    });
    onClickNext();
  };

  const onClickNext = () => {
    setCurrent(current + 1);
  };

  const onClickPrev = () => {
    setCurrent(current - 1);
  };

  const handleDebouncedSearchChange = useDebounce((value: string) => {
    setInputText(value || "");
  }, 300);

  const handleSelectChange = React.useCallback(
    (selectedValues: { value: string; label: React.ReactNode }) => {
      const filteredOptions = elementsOptions.filter(
        (element) => element.id.toString() === selectedValues.value
      );

      addMovieToList({
        session_id: sessionId,
        list_id: newList?.id,
        media_id: filteredOptions[0].id, // because is always only 1 element by id in array
      })
        .unwrap()
        .then((data) => {
          if (data.success) {
            // if prevSelectedElements exists, add the new elements to the array else it doesn't exist, simply add them
            setSelectedElements((prevSelectedElements) => [
              ...(prevSelectedElements || []),
              ...filteredOptions,
            ]);
            messageApi.success(
              `"${filteredOptions[0].title}" був успішно доданий до списку #${newList?.id}!`,
              3
            );
          } else {
            messageApi.error(`${data.status_message}`, 3);
          }
        })
        .catch((error) => {
          if (error && error.data.status_code === 8) {
            messageApi.error(
              `Сталась помилка! Елемент "${filteredOptions[0].title}" вже існує в списку #${newList?.id}`,
              5
            );
          } else {
            messageApi.error(
              `Сталась помилка! Код помилки: ${error.data.status_code}`,
              5
            );
          }
        });
    },
    [elementsOptions]
  );

  const onClickElementDelete = React.useCallback(
    (movieId: number, title: string) => {
      removeMovieFromList({
        session_id: sessionId,
        list_id: newList?.id,
        media_id: movieId, // because is always only 1 element by id in array
      })
        .unwrap()
        .then((data) => {
          if (data.success) {
            if (selectedElements !== undefined) {
              const filteredOptions = selectedElements.filter(
                (movie) => movie.id !== movieId
              );

              setSelectedElements(filteredOptions);
            }
            messageApi.success(
              `"${title}" був успішно видалений зі списку #${newList?.id}!`,
              3
            );
          } else {
            messageApi.success(`${data.status_message}`, 3);
          }
        })
        .catch((error) => {
          if (error && error.data.status_code === 21) {
            messageApi.error(
              `Сталась помилка! Елемента "${title}" не існує в списку #${newList?.id}`,
              5
            );
          } else {
            messageApi.error(
              `Сталась помилка! Код помилки: ${error.data.status_code}`,
              5
            );
          }
        });
    },
    [selectedElements]
  );

  React.useEffect(() => {
    setSessionId(localStorage.getItem("session_id"));
  }, []);

  React.useEffect(() => {
    // if search is not empty
    if (inputText.trim() !== "") {
      searchMulti(
        `language=uk-UA&sort_by=popularity.desc&with_text_query=${inputText}`,
        true
      )
        .unwrap()
        .then((data) => {
          if (data && data.results.length !== 0) {
            setElementsOptions(data.results);
          }
        })
        .finally(() => {});
    } else {
      setElementsOptions([]);
    }
  }, [inputText]);

  const steps = [
    {
      title: "Деталі списку",
      content: (
        <div className={styles.content}>
          <Form
            form={formStep1}
            name="create-form"
            layout="vertical"
            onFinish={onClickFinishStep1}
          >
            <Form.Item
              name="name"
              label="Найменування"
              rules={[
                { required: true, message: `Поле "Найменування" обов'язкове` },
              ]}
              tooltip="Те, як буде називатись ваш список (обов'язкове поле)"
            >
              <Input placeholder="Введіть найменування вашого списку" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Опис"
              rules={[{ required: true, message: `Поле "Опис" обов'язкове` }]}
              tooltip="Те, як буде описуватись ваш список (обов'язкове поле)"
            >
              <Input.TextArea
                placeholder="Введіть опис вашого списку"
                rows={4}
              />
            </Form.Item>
            <Form.Item
              name="private"
              label="Приватний список?"
              valuePropName="checked"
              tooltip="Чи буде ваш список відображатись для інших користувачів. За замовчуванням список буде показуватись, якщо не обрана опція"
            >
              <Checkbox defaultChecked={false}>Так</Checkbox>
            </Form.Item>
            <Button htmlType="submit" type="primary">
              Продовжити
            </Button>
          </Form>
        </div>
      ),
    },
    {
      title: "Додавання елементів",
      content: (
        <div className={styles.content}>
          <Form
            form={formStep2}
            name="add-element-form"
            layout="vertical"
            onFinish={onClickFinishStep2}
          >
            <Form.Item
              name="element"
              label="Додати елемент"
              rules={[
                {
                  required: true,
                  message: `Поле "Додати елемент" обов'язкове`,
                },
              ]}
              tooltip="Оберіть один чи декілька елементів, які хочете додати в список."
            >
              <Select
                showSearch
                optionFilterProp="label"
                onSearch={handleDebouncedSearchChange}
                onChange={handleSelectChange}
                placeholder="Почніть вводити назву елементу..."
                notFoundContent={
                  isSearchMovieFetching ? (
                    <div className={styles.selectLoading}>
                      <Spin
                        indicator={
                          <LoadingOutlined style={{ fontSize: 30 }} spin />
                        }
                      />
                    </div>
                  ) : null
                }
                labelInValue={true}
                showArrow={false}
                value={null}
                size="large"
              >
                {elementsOptions.map((element, index) => (
                  <Select.Option
                    key={element.id}
                    value={element.id.toString()}
                    label={element.title}
                  >
                    <OptionElement
                      index={index}
                      title={element.title}
                      poster_path={
                        element.poster_path
                          ? `https://image.tmdb.org/t/p/w45_and_h67_bestv2/${element.poster_path}`
                          : "https://placehold.co/45x/png/?text=Not+Found"
                      }
                      release_date={element.release_date}
                    />
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <div className={styles.cards}>
              {selectedElements && selectedElements.length !== 0 && (
                <>
                  <h3>Додані елементи:</h3>
                  {selectedElements.map((movie, index) => (
                    <WideMovieCard
                      id={movie.id}
                      priorityIndex={index}
                      title={movie.title}
                      vote_average={movie.vote_average}
                      release_date={movie.release_date}
                      overview={movie.overview}
                      poster_path={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${movie.poster_path}`
                          : "https://placehold.co/150x225/png/?text=Not+Found"
                      }
                      isShowDelete
                      onClickElementDelete={(id, title) => {onClickElementDelete(id, title)}}
                    />
                  ))}
                </>
              )}
            </div>
            <Button htmlType="submit" type="primary">
              Продовжити
            </Button>
          </Form>
        </div>
      ),
    },
    {
      title: "Готово!",
      content: (
        <div className={styles.content}>
          {newList && (
            <Result
              status="success"
              title={`Список "${newList.name}" був успішно створений!`}
              subTitle="Бажаєте перейти до нього або створити новий список?"
              extra={[
                <Button type="primary" key="console">
                  <Link href={`/lists/${newList.id}`}>Перейти до списку</Link>
                </Button>,
                <Button href={`/lists/new`}>Створити новий список</Button>,
              ]}
            />
          )}
        </div>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className={styles.container}>
      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => onClickPrev()}>
            Повернутись назад
          </Button>
        )}
      </div>
      {contextMessageHolder}
    </div>
  );
};

export default ListNewBlock;
