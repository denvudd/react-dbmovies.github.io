import React from "react";

import CreditCard from "../UI/CreditCard/CreditCard";
import { v4 as uuidv4 } from "uuid";
import type {
  AggregateCrewMember,
  TVAggregateCreditsApiResponse,
} from "@/redux/api/tv/types";

import styles from "./TVCreditsBlock.module.scss";

interface TVCastBlockProps {
  crew: TVAggregateCreditsApiResponse["crew"];
  cast: TVAggregateCreditsApiResponse["cast"];
}

interface CrewByDepartment {
  [key: string]: AggregateCrewMember[];
}

const TVCastBlock: React.FC<TVCastBlockProps> = ({ cast, crew }) => {
  const crewByDepartment = crew.reduce(
    (acc: CrewByDepartment, member: AggregateCrewMember) => {
      const { department } = member;
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(member);
      return acc;
    },
    {}
  );

  return (
    <div className={styles.cast}>
      <div className="app-container">
        <div className={styles.inner}>
          <section className={styles.panel}>
            <h3>
              Акторський склад серіалу <span>{cast.length}</span>
            </h3>
            <ol className={styles.people}>
              {cast.map((cast) => (
                <CreditCard
                  id={cast.id}
                  key={cast.id}
                  name={cast.name}
                  poster={cast.profile_path}
                  character={cast.roles}
                  type="tv"
                />
              ))}
            </ol>
          </section>
          <section className={styles.panel}>
            <h3>
              Знімальна група серіалу <span>{crew.length}</span>
            </h3>
            {crewByDepartment["Writing"] && (
              <div className={styles.crewWrapper}>
                <h4>Сценарій</h4>
                <ol className={styles.people}>
                  {crewByDepartment["Writing"].map((crew) => (
                    <CreditCard
                      id={crew.id}
                      key={uuidv4()}
                      name={crew.name}
                      poster={crew.profile_path}
                      job={crew.jobs}
                      type="tv"
                    />
                  ))}
                </ol>
              </div>
            )}
            {crewByDepartment["Directing"] && (
              <div className={styles.crewWrapper}>
                <h4>Режисура</h4>
                <ol className={styles.people}>
                  {crewByDepartment["Directing"].map((crew) => (
                    <CreditCard
                      id={crew.id}
                      key={uuidv4()}
                      name={crew.name}
                      poster={crew.profile_path}
                      job={crew.jobs}
                      type="tv"
                    />
                  ))}
                </ol>
              </div>
            )}
            {crewByDepartment["Camera"] && (
              <div className={styles.crewWrapper}>
                <h4>Операторська робота</h4>
                <ol className={styles.people}>
                  {crewByDepartment["Camera"].map((crew) => (
                    <CreditCard
                      id={crew.id}
                      key={uuidv4()}
                      name={crew.name}
                      poster={crew.profile_path}
                      job={crew.jobs}
                      type="tv"
                    />
                  ))}
                </ol>
              </div>
            )}
            {crewByDepartment["Art"] && (
              <div className={styles.crewWrapper}>
                <h4>Художній відділ</h4>
                <ol className={styles.people}>
                  {crewByDepartment["Art"].map((crew) => (
                    <CreditCard
                      id={crew.id}
                      key={uuidv4()}
                      name={crew.name}
                      poster={crew.profile_path}
                      job={crew.jobs}
                      type="tv"
                    />
                  ))}
                </ol>
              </div>
            )}
            {crewByDepartment["Costume & Make-Up"] && (
              <div className={styles.crewWrapper}>
                <h4>Костюми та грим</h4>
                <ol className={styles.people}>
                  {crewByDepartment["Costume & Make-Up"].map((crew) => (
                    <CreditCard
                      id={crew.id}
                      key={uuidv4()}
                      name={crew.name}
                      poster={crew.profile_path}
                      job={crew.jobs}
                      type="tv"
                    />
                  ))}
                </ol>
              </div>
            )}
            {crewByDepartment["Editing"] && (
              <div className={styles.crewWrapper}>
                <h4>Монтаж</h4>
                <ol className={styles.people}>
                  {crewByDepartment["Editing"].map((crew) => (
                    <CreditCard
                      id={crew.id}
                      key={uuidv4()}
                      name={crew.name}
                      poster={crew.profile_path}
                      job={crew.jobs}
                      type="tv"
                    />
                  ))}
                </ol>
              </div>
            )}
            {crewByDepartment["Lighting"] && (
              <div className={styles.crewWrapper}>
                <h4>Освітлення</h4>
                <ol className={styles.people}>
                  {crewByDepartment["Lighting"].map((crew) => (
                    <CreditCard
                      id={crew.id}
                      key={uuidv4()}
                      name={crew.name}
                      poster={crew.profile_path}
                      job={crew.jobs}
                      type="tv"
                    />
                  ))}
                </ol>
              </div>
            )}
            {crewByDepartment["Production"] && (
              <div className={styles.crewWrapper}>
                <h4>Виробництво</h4>
                <ol className={styles.people}>
                  {crewByDepartment["Production"].map((crew) => (
                    <CreditCard
                      id={crew.id}
                      key={uuidv4()}
                      name={crew.name}
                      poster={crew.profile_path}
                      job={crew.jobs}
                      type="tv"
                    />
                  ))}
                </ol>
              </div>
            )}
            {crewByDepartment["Sound"] && (
              <div className={styles.crewWrapper}>
                <h4>Звук</h4>
                <ol className={styles.people}>
                  {crewByDepartment["Sound"].map((crew) => (
                    <CreditCard
                      id={crew.id}
                      key={uuidv4()}
                      name={crew.name}
                      poster={crew.profile_path}
                      job={crew.jobs}
                      type="tv"
                    />
                  ))}
                </ol>
              </div>
            )}
            {crewByDepartment["Visual Effect"] && (
              <div className={styles.crewWrapper}>
                <h4>Візуальні ефекти</h4>
                <ol className={styles.people}>
                  {crewByDepartment["Visual Effect"].map((crew) => (
                    <CreditCard
                      id={crew.id}
                      key={uuidv4()}
                      name={crew.name}
                      poster={crew.profile_path}
                      job={crew.jobs}
                      type="tv"
                    />
                  ))}
                </ol>
              </div>
            )}
            {crewByDepartment["Crew"] && (
              <div className={styles.crewWrapper}>
                <h4>Персонал</h4>
                <ol className={styles.people}>
                  {crewByDepartment["Crew"].map((crew) => (
                    <CreditCard
                      id={crew.id}
                      key={uuidv4()}
                      name={crew.name}
                      poster={crew.profile_path}
                      job={crew.jobs}
                      type="tv"
                    />
                  ))}
                </ol>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TVCastBlock;
