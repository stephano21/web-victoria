import {
    Notification,
    NotificationProps,
    ContainerProps,
    useToaster as useRsuiteToaster,
  } from "rsuite";
  import React, { ReactNode } from "react";
  
  type ToastType = "success" | "warning" | "error" | "info";
  
  interface ToastOptions {
    pushOptions?: {
      duration?: number;
      placement?: string;
    };
    notificationProps?: NotificationProps;
  }
  
  interface Toaster {
    push: (element: React.ReactNode, options?: ContainerProps) => string | Promise<string | undefined> | undefined;
    notify: (message: string, type: ToastType, options?: ToastOptions) => void;
    remove: (key: string) => void;
    clear: () => void;
  }
  
  const useToaster = (...props: any[]): Toaster => {
    const toaster = useRsuiteToaster();
  
    const notify = (message: string, type: ToastType, options?: ToastOptions): void => {
      const pushOptions = { duration: 13000, placement: "bottomEnd", ...options?.pushOptions || {} };
      const notificationProps = { closable: true, ...options?.notificationProps || {} };
      notificationProps.header =
        notificationProps.header ||
        (type === "success" && "Operación exitosa") ||
        (type === "warning" && "Advertencia") ||
        (type === "error" && "Error") ||
        (type === "info" && "Notificación");
  
      toaster.push(<Notification type={type} {...notificationProps}>{message}</Notification>, pushOptions);
    };
  
    const push = (element: React.ReactNode, options?: ContainerProps): string | Promise<string | undefined> | undefined => {
      return toaster.push(element, options);
    };
  
    return { ...toaster, notify, push };
  };
  
  export default useToaster;
  