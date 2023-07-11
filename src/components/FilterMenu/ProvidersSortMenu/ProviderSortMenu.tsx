import React from "react";
import { useGetWatchProvidersQuery } from "@/redux/api/discover/slice";

import { Menu } from "antd";
import Image from "next/image";
import { CheckOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import type { ProvidersSortData } from "@/redux/params/types/types";

import styles from "./ProvidersSortMenu.module.scss";

interface ProvidersSortMenuProps {
  onProvidersSortChange: (providers: string[] | null) => void;
  mediaType: "movies" | "tv";
}

const ProvidersSortMenu: React.FC<ProvidersSortMenuProps> = React.memo(
  ({ onProvidersSortChange, mediaType }) => {
    const { data: watchProviders, isLoading: isWatchProvidersLoading } =
      useGetWatchProvidersQuery({
        language: "uk-UA",
        watch_region: "UA",
        type: mediaType === "movies" ? "movie" : "tv",
      });
    const [selectedProviders, setSelectedProviders] = React.useState<
      string[] | null
    >(null);
    const [providersSortData, setProvidersSortData] =
      React.useState<ProvidersSortData>({
        withWatchProviders: null,
      });

    const handleProviderChange = (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      key: string
    ) => {
      event.preventDefault();

      if (selectedProviders === null) {
        setSelectedProviders([key]);
        return;
      }

      const providerIndex = selectedProviders.indexOf(key);

      if (providerIndex === -1) {
        setSelectedProviders([...selectedProviders, key]);
      } else {
        const updatedProviders = [...selectedProviders];
        updatedProviders.splice(providerIndex, 1);
        setSelectedProviders(updatedProviders);
      }
    };

    React.useEffect(() => {
      setProvidersSortData({
        withWatchProviders: selectedProviders,
      });
    }, [selectedProviders]);

    React.useEffect(() => {
      onProvidersSortChange(providersSortData.withWatchProviders);
    }, [providersSortData]);

    const menuItems: MenuProps["items"] = [
      {
        key: "sub1",
        label: (
          <span className={styles.title}>
            Де подивитися{" "}
            <span className={styles.count}>
              {watchProviders ? watchProviders.results.length : 0}
            </span>
          </span>
        ),
        children: [
          {
            key: "1",
            label: (
              <div className={styles.menu}>
                <h3>Обмежити пошук указаними сервісами:</h3>
                <div className={styles.wrapper}>
                  <ul className={styles.providers}>
                    {watchProviders &&
                      watchProviders.results.length !== 0 &&
                      watchProviders.results.map((provider) => {
                        const isSelected = selectedProviders?.includes(
                          provider.provider_id.toString()
                        );
                        const providerClassName = isSelected
                          ? styles.selectedProvider
                          : styles.providerItem;

                        return (
                          <li className={providerClassName}>
                            <a
                              href="#"
                              onClick={(e) =>
                                handleProviderChange(
                                  e,
                                  provider.provider_id.toString()
                                )
                              }
                            >
                              <Image
                                src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
                                width={50}
                                height={50}
                                alt={`${provider.provider_name}`}
                              />
                              <div className={styles.checkWrapper}>
                                <CheckOutlined />
                              </div>
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            ),
            type: "group",
          },
        ],
      },
    ];

    return (
      <form>
        <Menu
          mode="inline"
          style={{ height: "100%" }}
          theme="dark"
          items={menuItems}
        />
      </form>
    );
  }
);

export default ProvidersSortMenu;
