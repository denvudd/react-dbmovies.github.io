import React from "react";
import styles from "./ListNewBlock.module.scss";
import { Button, Checkbox, Form, Input, Steps } from "antd";
import { usePostCreateListMutation } from "@/redux/api/lists/slice";

const ListNewBlock = () => {
  const [createList, { data, isLoading }] = usePostCreateListMutation();
  const [sessionId, setSessionId] = React.useState<string | null>("");
  const [current, setCurrent] = React.useState(0);
  const [form] = Form.useForm();

  React.useEffect(() => {
    setSessionId(localStorage.getItem("session_id"));
  }, []);

  const onClickFinish = (values: any) => {
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

  const steps = [
    {
      title: "Деталі списку",
      content: (
        <div className={styles.content}>
          <Form
            form={form}
            name="create-form"
            layout="vertical"
            onFinish={onClickFinish}
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
      content: "Second-content",
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
