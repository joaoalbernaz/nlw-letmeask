import SweetAlert from "sweetalert2";

export function getStyledSweetAlertModal(isDarkMode: boolean) {
  const background = isDarkMode ? "#29292e" : "#f8f8f8;";
  const color = isDarkMode ? "#fff" : "#29292e";
  
  return SweetAlert.mixin({
    background: background,
    color: color
  })
}