// import React from "react";
// import RatingBar from "@/components/UI/RatingBar/RatingBar";
// import CaretRightFilled from "@ant-design/icons/lib/icons/CaretRightFilled";
// import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
// import HeartFilled from "@ant-design/icons/lib/icons/HeartFilled";
// import PushpinFilled from "@ant-design/icons/lib/icons/PushpinFilled";
// import StarFilled from "@ant-design/icons/lib/icons/StarFilled";
// import { Popover } from "antd";
// import classNames from "classnames";

// interface MovieDetailsHeadActionsProps {
//   vote_average: number;
// }

// import styles from './MovieDetailsHeadActions.module.scss'

// const MovieDetailsHeadActions: React.FC<MovieDetailsHeadActionsProps> = () => {
//   return (
//     <>
//       <ul className={styles.headerActions + " auto"}>
//         <li className={styles.chart}>
//           <RatingBar rating={vote_average} size={55} />
//           <span>Рейтинг</span>
//         </li>
//         <Popover
//           content={
//             <span>
//               {!sessionId &&
//                 "Увійдіть, щоби створювати та керувати власними списками"}
//               {sessionId && `Додати до списку`}
//             </span>
//           }
//           placement="bottom"
//         >
//           <li className={styles.tooltip}>
//             <button onClick={onClickAddMovieToList}>
//               <span>
//                 <UnorderedListOutlined />
//               </span>
//             </button>
//           </li>
//         </Popover>
//         <Popover
//           content={
//             <span>
//               {!sessionId &&
//                 "Увійдіть, щоб додати цей фільм до списку вподобань"}
//               {accountStates?.favorite && sessionId && `Додано в обране`}
//               {accountStates?.favorite === false &&
//                 sessionId &&
//                 "Додати в обране"}
//             </span>
//           }
//           placement="bottom"
//         >
//           <li className={styles.tooltip}>
//             <button
//               className={classNames({
//                 [styles.favorited]: accountStates?.favorite,
//               })}
//               onClick={onClickAddMovieToFavorite}
//             >
//               <span>
//                 <HeartFilled />
//               </span>
//             </button>
//           </li>
//         </Popover>
//         <Popover
//           content={
//             <span>
//               {!sessionId &&
//                 "Увійдіть, щоб додати цей фільм до списку перегляду"}
//               {accountStates?.watchlist &&
//                 sessionId &&
//                 `Додано до списку відстежень`}
//               {accountStates?.watchlist === false &&
//                 sessionId &&
//                 "Додати до списку відстежень"}
//             </span>
//           }
//           placement="bottom"
//         >
//           <li className={styles.tooltip}>
//             <button
//               onClick={onClickAddMovieToWatchlist}
//               className={classNames({
//                 [styles.watchlist]: accountStates?.watchlist,
//               })}
//             >
//               <span>
//                 <PushpinFilled />
//               </span>
//             </button>
//           </li>
//         </Popover>
//         <Popover
//           content={
//             <span>
//               {!sessionId && "Увійдіть, щоб оцінити цей фільм"}
//               {accountStates?.rated &&
//                 sessionId &&
//                 `Оцінено ${accountStates.rated.value}.0`}
//               {accountStates?.rated === false && sessionId && "Оцінити!"}
//             </span>
//           }
//           placement="bottom"
//         >
//           <li className={styles.tooltip}>
//             <button
//               onClick={onClickRateMovie}
//               className={classNames({
//                 [styles.rated]: accountStates?.rated,
//               })}
//             >
//               <span>
//                 <StarFilled />
//               </span>
//             </button>
//           </li>
//         </Popover>
//         <li className={styles.video}>
//           <a href="">
//             <span>
//               <CaretRightFilled />
//             </span>{" "}
//             Дивитись трейлер
//           </a>
//         </li>
//       </ul>
//     </>
//   );
// };

// export default MovieDetailsHeadActions;
