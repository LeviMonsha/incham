import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { HomeIcon, PersonIcon, GearIcon } from "@radix-ui/react-icons";

export default function MenuBar() {
  return (
    <NavigationMenu.Root className="flex gap-4 bg-white p-2 rounded shadow">
      <NavigationMenu.List className="flex gap-4">
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="/main"
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            <HomeIcon />
            Главная
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            <PersonIcon />
            Профиль
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="/settings"
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            <GearIcon />
            Настройки
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Секрет
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
