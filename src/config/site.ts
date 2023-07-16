export type SiteConfig = typeof siteConfig;

export type MenuItem = {
  key: string;
  label: JSX.Element;
  children?: MenuItem[];
  type?: string;
};

export const siteConfig = {
  name: "The Movie Database (TMDB)",
  description:
    "The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.",
  url: "https://react-dbmovies.vercel.app/",
  tileColor: "#032541",
  keywords:
    "Movies, TV Shows, Streaming, Reviews, API, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "The Movie Database",
  },
  fb: {
    appId: "141280979243998",
  },
  twitter: {
    site: "@themoviedb",
  },
  mainNav: [
    {
      key: "movies",
      label: "Фільми",
      link: "/movies/popularMovies",
      children: [
        {
          key: "movies/popularMovies",
          label: "Популярні",
          link: "/movies/popularMovies",
          type: "group",
        },
        {
          key: "movies/now-playing",
          label: "Зараз у кіно",
          link: "/movies/now-playing",
          type: "group",
        },
        {
          key: "movies/upcoming",
          label: "Очікувані",
          link: "/movies/upcoming",
          type: "group",
        },
        {
          key: "movies/top-rated",
          label: "Рейтингові",
          link: "/movies/top-rated",
          type: "group",
        },
      ],
    },
    {
      key: "tv",
      label: "Серіали",
      link: "/tv/popularTV",
      children: [
        {
          key: "tv/popularTV",
          label: "Популярні",
          link: "/tv/popularTV",
          type: "group",
        },
        {
          key: "tv/airing-today",
          label: "Сьогодні в ефірі",
          link: "/tv/airing-today",
          type: "group",
        },
        {
          key: "tv/on-the-air",
          label: "Зараз на ТБ",
          link: "/tv/on-the-air",
          type: "group",
        },
        {
          key: "tv/top-rated",
          label: "Рейтингові",
          link: "/tv/top-rated",
          type: "group",
        },
      ],
    },
    {
      key: "persons",
      label: "Персони",
      link: "/person/popular",
    },
  ],
  footerNav: [
    [
      {
        title: "Основи",
        items: [
          { text: "Про TMDB", href: "https://www.themoviedb.org/about" },
          {
            text: "Зв’язок із нами",
            href: "https://www.themoviedb.org/about/staying-in-touch",
          },
          { text: "Форуми підтримки", href: "https://www.themoviedb.org/talk" },
          {
            text: "API",
            href: "https://www.themoviedb.org/login?to=read_me&redirect_uri=/docs",
          },
          { text: "Стан системи", href: "https://status.themoviedb.org/" },
        ],
      },
    ],
    [
      {
        title: "Узяти участь",
        items: [
          {
            text: "Біблія зі сприяння",
            href: "https://www.themoviedb.org/bible",
          },
          {
            text: "Додати новий фільм",
            href: "https://www.themoviedb.org/movie/new",
          },
          {
            text: "Додати новий серіал",
            href: "https://www.themoviedb.org/tv/new",
          },
        ],
      },
    ],
    [
      {
        title: "Спільнота",
        items: [
          {
            text: "Поради",
            href: "https://www.themoviedb.org/documentation/community/guidelines",
          },
          { text: "Обговорення", href: "https://www.themoviedb.org/discuss" },
          {
            text: "Таблиця лідерів",
            href: "https://www.themoviedb.org/leaderboard",
          },
          { text: "Twitter", href: "https://twitter.com/themoviedb" },
        ],
      },
    ],
    [
      {
        title: "Угоди",
        items: [
          {
            text: "Умови користування",
            href: "https://www.themoviedb.org/terms-of-use",
          },
          {
            text: "Правила використання API",
            href: "https://www.themoviedb.org/documentation/api/terms-of-use",
          },
          {
            text: "Політика конфіденційності",
            href: "https://www.themoviedb.org/privacy-policy",
          },
        ],
      },
    ],
  ],
};
