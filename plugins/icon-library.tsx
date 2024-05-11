/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Icon, IconProps } from "~/components/icon/icon";
import { iconNames } from "~/components/icon/icons/types";

// Icon Library part
const ClickableIcon = ({ name, size, ...props }: IconProps) => {
  const [clicked, setClicked] = React.useState(false);
  const copyIcon = () => {
    setClicked(true);
    // Shows toast that you copied the icon
    toast("Copied to clipboard");
    // Writes the icon to the clipboard
    navigator.clipboard.writeText(
      `<Icon name="${name}" size="${size}"${
        props.className ? ` className="${props.className}"` : ""
      } />`
    );
    // Reverts the icon from checked to normal after 1.5 seconds
    setTimeout(() => {
      setClicked(false);
    }, 1500);
  };
  return (
    <Icon
      className={clsx(
        props.className,
        clicked ? "text-green-500" : "hover:cursor-pointer"
      )}
      name={clicked ? "LightningBolt" : name}
      size={size}
      onClick={copyIcon}
    />
  );
};

const IconLibrary = () => {
  const [iconClasses, setIconClasses] = useState("");
  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex items-center justify-end gap-2">
        <label htmlFor="icon-class" className="text-white">
          Icon classes:
        </label>
        <input
          id="icon-class"
          placeholder="Optional classes to apply to icons"
          className="  w-full rounded-md !text-gray-800 bg-gray-100 !p-2 dark:bg-gray-800 dark:!text-gray-100 md:w-1/2 xl:w-1/3"
          value={iconClasses}
          onChange={(e) => setIconClasses(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-4 place-items-center justify-items-stretch gap-4 rounded-md !border !border-gray-600 p-2 md:grid-cols-6 xl:grid-cols-8">
        {iconNames.map((key: any) => {
          return (
            <div
              key={key}
              className="inline-flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="mb-2 w-full truncate text-center">{key}</div>
              <div className="flex items-center gap-2">
                <ClickableIcon className={iconClasses} size="sm" name={key} />
                <ClickableIcon className={iconClasses} size="md" name={key} />
                <ClickableIcon className={iconClasses} size="lg" name={key} />
                <ClickableIcon className={iconClasses} size="xl" name={key} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const iconLibraryPlugin = () => ({
  icon: <Icon name="LightningBolt" size="sm" />,
  component: <IconLibrary />,
  name: "Icon Library",
  id: "icon-library",
  requiresForge: false,
  hideTimeline: true,
});
