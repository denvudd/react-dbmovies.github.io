import React from "react";
import { useLazyGetAccountListsQuery } from "@/redux/api/account/slice";
import { usePostAddMovieToListMutation } from "@/redux/api/lists/slice";

import { UnorderedListOutlined } from "@ant-design/icons";
import { Select, Button, Modal } from "antd";
import Link from "next/link";
import type { MessageInstance } from "antd/es/message/interface";

/**
 * A custom React hook for adding a movie to the user's list. Returns an object with a handler function, loading state, and modal holder.
*/

export const useAddMovieToList = (
  sessionId: string | null,
  id: number,
  title: string,
  messageApi: MessageInstance // for using common message api and context message holder
) => {
  const [addMovieToList, { isLoading }] = usePostAddMovieToListMutation();
  const [fetchAccountLists] = useLazyGetAccountListsQuery();
  const [listId, setListId] = React.useState<number>(0);
  const [isListSubmit, setIsListSubmit] = React.useState(false);
  const [modal, addMovieListModalHolder] = Modal.useModal();

  const onClickAddMovieToList = () => {
    if (sessionId) {
      const listModal = modal.info({
        title: `Додати "${title}" до списку?`,
      });

      const onChangeList = (value: string) => {
        if (value !== "" && value) {
          setListId(Number(value));
          listModal.update({
            okText: "Підтвердити",
            okButtonProps: { disabled: false },
          });
        }
      };

      fetchAccountLists({ session_id: sessionId }, true)
        .unwrap()
        .then((data) => {
          listModal.update({
            title: `Додати "${title}" до списку?`,
            content: (
              <div>
                <p className="list-label">Додати до існуючих списків:</p>
                <Select
                  style={{ width: "100%" }}
                  placeholder={"Оберіть список"}
                  onChange={onChangeList}
                  options={
                    data.results && data.results.length !== 0
                      ? data.results.map((list) => ({
                          value: list.id,
                          label: list.name,
                        }))
                      : undefined
                  }
                  notFoundContent={"Не знайдено жодного списка"}
                />
                <p className="list-label">Або:</p>
                <Button type="primary">
                  <Link href={`/lists/new`}>Створити новий список</Link>
                </Button>
              </div>
            ),
            icon: <UnorderedListOutlined />,
            onOk() {
              setIsListSubmit(true);
            },
            onCancel() {},
            okText: "Оберіть список",
            okButtonProps: {
              disabled: true,
              title: "Оберіть список щоб продовжити",
            },
            closable: true,
          });
        });
    }

    if (!sessionId) {
      return;
    }
  };

  React.useEffect(() => {
    if (isListSubmit) {
      Modal.destroyAll();
      if (sessionId) {
        addMovieToList({
          session_id: sessionId,
          list_id: listId,
          media_id: id,
        })
          .unwrap()
          .then((data) => {
            if (data.success && data.status_code === 12) {
              messageApi.success(
                `"${title}" був успішно доданий до списку #${listId}!`,
                3
              );
            } else {
              messageApi.success(`${data.status_message}`, 3);
            }
          })
          .catch((error) => {
            if (error && error.data.status_code === 8) {
              messageApi.error(
                `Сталась помилка! Елемент "${title}" вже існує в списку #${listId}`,
                5
              );
            } else {
              messageApi.error(
                `Сталась помилка! Код помилки: ${error.data.status_code}`,
                5
              );
            }
          })
          .finally(() => setIsListSubmit(false));
      }
    } else {
      return;
    }
  }, [isListSubmit]);

  return {
    onClickAddMovieToList,
    isLoading,
    addMovieListModalHolder,
  };
};
