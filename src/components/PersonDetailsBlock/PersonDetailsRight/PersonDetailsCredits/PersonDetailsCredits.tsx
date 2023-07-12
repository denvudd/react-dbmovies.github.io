import React from "react";
import Link from "next/link";
import type {
  CombinedCrewMovie,
  CombinedCrewTV,
  PersonCombinedCreditsApiResponse,
} from "@/redux/api/people/types";
import styles from "./PersonDetailsCredits.module.scss";
import { useGetConfigurationJobsQuery } from "@/redux/api/configuration/slice";
import { checkDepartmentName } from "@/utils/checkDepartmentName";

interface PersonDetailsCreditsProps {
  cast: PersonCombinedCreditsApiResponse["cast"];
  crew: PersonCombinedCreditsApiResponse["crew"];
  known_for_department: string;
}

interface CrewByDepartment {
  [key: string]: (CombinedCrewMovie | CombinedCrewTV)[];
}

const PersonDetailsCredits: React.FC<PersonDetailsCreditsProps> = ({
  cast,
  crew,
  known_for_department,
}) => {
  const { data: jobs, isLoading: isJobsLoading } =
    useGetConfigurationJobsQuery(null);
  const departments = jobs?.map((job) => job.department);
  const groupedByYear: Map<
    string,
    {
      id: number;
      title: string;
      release: string | null;
      type: "movie" | "tv";
    }[]
  > = new Map();

  const crewByDepartment = crew.reduce(
    (acc: CrewByDepartment, member: CombinedCrewMovie | CombinedCrewTV) => {
      const { department } = member;
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(member);
      return acc;
    },
    {}
  );

  const createCreditsList = (department: string) => {
    groupedByYear.clear();
    if (department === "Acting") {
      cast.forEach((element) => {
        if (element.media_type === "movie") {
          const [year] = element.release_date.split("-");

          if (!groupedByYear.has(year)) {
            groupedByYear.set(year, []);
          }

          groupedByYear.get(year)?.push({
            id: element.id,
            title: element.title,
            release: element.release_date,
            type: "movie",
          });
        } else if (element.media_type === "tv") {
          const [year] = element.first_air_date.split("-");

          if (!groupedByYear.has(year)) {
            groupedByYear.set(year, []);
          }

          groupedByYear.get(year)?.push({
            id: element.id,
            title: element.name,
            release: element.first_air_date,
            type: "tv",
          });
        }
      });

      const formattedCredits = Array.from(groupedByYear, ([year, movie]) => ({
        year,
        movie,
      }));

      return formattedCredits.sort((a, b) => Number(b.year) - Number(a.year));
    } else {
      crewByDepartment[department].forEach((element) => {
        if (element.media_type === "movie") {
          const [year] = element.release_date.split("-");

          if (!groupedByYear.has(year)) {
            groupedByYear.set(year, []);
          }

          groupedByYear.get(year)?.push({
            id: element.id,
            title: element.title,
            release: element.release_date,
            type: "movie",
          });
        } else if (element.media_type === "tv") {
          const [year] = element.first_air_date.split("-");

          if (!groupedByYear.has(year)) {
            groupedByYear.set(year, []);
          }

          groupedByYear.get(year)?.push({
            id: element.id,
            title: element.name,
            release: element.first_air_date,
            type: "tv",
          });
        }
      });

      const formattedCredits = Array.from(groupedByYear, ([year, movie]) => ({
        year,
        movie,
      }));

      return formattedCredits.sort((a, b) => Number(b.year) - Number(a.year));
    }
  };

  return (
    <>
      <div className={styles.list}>
        <h3>{checkDepartmentName(known_for_department)}</h3>
        <table className={styles.credits}>
          <tbody>
            {createCreditsList(known_for_department).map((credit) => (
              <tr>
                <td>
                  <table className={styles.creditsGroup}>
                    <tbody>
                      {credit.movie.map((title) => (
                        <tr>
                          <td className={styles.year}>
                            {title.release ? title.release.split("-")[0] : "—"}
                          </td>
                          <td className={styles.title}>
                            <Link href={`/${title.type}/${title.id}`}>
                              {title.title}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {departments &&
        jobs &&
        departments.map((department) => {
          if (
            known_for_department !== department &&
            crewByDepartment[department]
          ) {
            return (
              <div className={styles.list}>
                <h3>{checkDepartmentName(department)}</h3>
                <table className={styles.credits}>
                  <tbody>
                    {createCreditsList(department).map((credit) => (
                      <tr>
                        <td>
                          <table className={styles.creditsGroup}>
                            <tbody>
                              {credit.movie.map((title) => (
                                <tr>
                                  <td className={styles.year}>
                                    {title.release
                                      ? title.release.split("-")[0]
                                      : "—"}
                                  </td>
                                  <td className={styles.title}>
                                    <Link href={`/${title.type}/${title.id}`}>
                                      {title.title}
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        })}
    </>
  );
};

export default PersonDetailsCredits;
