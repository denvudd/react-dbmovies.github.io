/**
 * A special needed function for checking credit department name in Ukrainian language
 * @returns string
 * @example
 * console.log(checkDepartmentName("Directing")) // Output: "Режисура";
*/

export const checkDepartmentName = (departament: string) => {
  switch (departament) {
    case "Acting":
      return "Акторська гра";
    case "Visual Effects":
      return "Візуальні ефекти";
    case "Art":
      return "Художній відділ";
    case "Sound":
      return "Звук";
    case "Production":
      return "Виробництво";
    case "Directing":
      return "Режисура";
    case "Writting":
      return "Сценарій";
    case "Crew":
      return "Персонал";
    case "Lighting":
      return "Освітлення";
    case "Costume & Make-Up":
      return "Костюми та грим";
    case "Actors":
      return "Актор";
    case "Editing":
      return "Монтаж";
    case "Camera":
      return "Операторська робота";
    default:
      return "-"
  }
};
