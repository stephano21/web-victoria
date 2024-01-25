import React, { ReactNode, useContext } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import banner from './../assets/brand.png'
//Auth
import { useAuth } from "./../context/AuthContext";
import { AlertContext } from "../context/AlertContext";
interface BaseLayoutProps {
  PageName?: string;
  children: ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = (
  props: BaseLayoutProps
) => {
  const { children, PageName } = props;
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [openAcordion, setOpenAcordion] = React.useState(0);
 
  const handleOpen = (value) => setOpenAcordion(open === value ? 0 : value);
  const { alerts } = useContext(AlertContext);
  const { logout, UserData } = useAuth();
  return (
    <React.Fragment>
      <Button onClick={openDrawer} placeholder={"gfg"}>Open Drawer</Button>
      <Drawer placeholder={"gfg"} open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Material Tailwind
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>What is Material Tailwind?</AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          How to use Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          What can I do with Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
      </Drawer>
    </React.Fragment>
  );
};
