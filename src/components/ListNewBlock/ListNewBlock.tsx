import React from "react";
import { usePostCreateListMutation } from "@/redux/api/lists/slice";
import { useLazyGetMovieDiscoverQuery } from "@/redux/api/discover/slice";
import { useDebounce } from "@/hooks/useDebounce";
import { Button, Checkbox, Form, Input, Select, Spin, Steps, Typography } from "antd";
import { ListMovie } from "@/redux/api/movies/types/ListMovieType";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "./ListNewBlock.module.scss";
import Link from "next/link";
import Image from "next/image";
import { formatReleaseDate } from "@/utils/formatReleaseDate";
import RatingBar from "../UI/RatingBar/RatingBar";

const ListNewBlock = () => {
  const [createList, { data, isLoading }] = usePostCreateListMutation();
  const [
    searchMulti,
    { data: searchMovieData, isFetching: isSearchMovieFetching },
  ] = useLazyGetMovieDiscoverQuery();
  const [inputText, setInputText] = React.useState<string>("");
  const [selectedElements, setSelectedElements] = React.useState<ListMovie[]>();
  const [elementsOptions, setElementsOptions] = React.useState<ListMovie[]>([]);
  const [sessionId, setSessionId] = React.useState<string | null>("");
  const [current, setCurrent] = React.useState(0);
  const [formStep1] = Form.useForm();
  const [formStep2] = Form.useForm();

  const onClickFinishStep1 = (values: any) => {
    console.log(values);
    createList({
      session_id: sessionId,
      name: values.name,
      description: values.description,
    });
    onClickNext();
  };

  const onClickFinishStep2 = (values: any) => {
    console.log(values);
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
      // if prevSelectedElements exists, add the new elements to the array else it doesn't exist, simply add them
      setSelectedElements((prevSelectedElements) => [
        ...(prevSelectedElements || []),
        ...filteredOptions,
      ]);
    },
    [elementsOptions]
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
                loading={isSearchMovieFetching}
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
                showArrow={true}
                allowClear
                size="large"
              >
                {elementsOptions.map((element) => (
                  <Select.Option
                    key={element.id}
                    value={element.id.toString()}
                    label={element.title}
                  >
                    <div>{element.title}</div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <div className={styles.cards}>
              {selectedElements &&
                selectedElements.length !== 0 &&
                selectedElements.map((movie) => (
                  <div className={styles.card}>
                    <div className={styles.image}>
                      <div className={styles.poster}>
                        <Link href={`/movies/${movie.id}`}>
                          <Image
                            width={150}
                            height={225}
                            alt={`${movie.title}`}
                            src={
                              movie.poster_path
                                ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${movie.poster_path}`
                                : "https://placehold.co/150x225/png/?text=Not+Found"
                            }
                          />
                        </Link>
                      </div>
                    </div>
                    <div className={styles.details}>
                      <div className={styles.detailsMain}>
                        <div className={styles.detailsHead}>
                          <RatingBar size={38} rating={movie.vote_average} />
                          <div className={styles.title}>
                            <div>
                              <Link href={`/movies/${movie.id}`}>
                                <h2>{movie.title}</h2>
                              </Link>
                            </div>
                            <span className={styles.release}>
                              {formatReleaseDate(movie.release_date)}
                            </span>
                          </div>
                        </div>
                        <div className={styles.overview}>
                          <Typography.Paragraph ellipsis={{ rows: 2 }}>
                            {movie.overview}
                          </Typography.Paragraph>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                ))}
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
      content: "Last-content",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className={styles.container}>
      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current === steps.length - 1 && <Button type="primary">Done</Button>}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => onClickPrev()}>
            Повернутись назад
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListNewBlock;
