import { logout } from "@/api/queries/auth.query";
import MainButton from "@/components/MainButton";
import { ACCESS_TOKEN } from "@/constants/Constants";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";

export default function Logout() {
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });

  const t = useTranslations();
  const handleLogout = () => {
    logoutMutation.mutate();
    localStorage.removeItem("AccessToken");
    Cookies.remove(ACCESS_TOKEN);
    window.location.href = "/";
  };
  return (
    <MainButton onClick={handleLogout} className=" text-left">
      {t("logout")}
    </MainButton>
  );
}
