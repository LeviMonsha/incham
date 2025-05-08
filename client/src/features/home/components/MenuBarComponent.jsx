import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { EnterIcon, PlusCircledIcon } from "@radix-ui/react-icons";

export default function MenuBar() {
  return (
    <NavigationMenu.Root className="flex gap-4 bg-white p-2 rounded shadow">
      <NavigationMenu.List className="flex gap-4">
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="/auth?mode=login"
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            <EnterIcon />
            Войти в аккаунт
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="/auth?mode=register"
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            <PlusCircledIcon />
            Создать аккаунт
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
