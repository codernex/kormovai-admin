import {
  TbSettings2,
  TbUsersGroup,
  TbCashBanknote,
  TbCards,
} from "react-icons/tb";
import { FaIdCardAlt } from "react-icons/fa";

export const navigation: {
  title: string;
  icon: React.ElementType;
  href: string;
}[] = [
  {
    title: "Payments",
    icon: TbCashBanknote,
    href: "payments",
  },
  {
    title: "Deposits",
    icon: TbCards,
    href: "deposits",
  },
  { title: "Users", icon: TbUsersGroup, href: "users" },
  { title: "Memebership", icon: FaIdCardAlt, href: "membership" },
  {
    title: "Settings",
    icon: TbSettings2,
    href: "settings",
  },
];
