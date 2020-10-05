import * as React from "react";
import * as Permissions from "expo-permissions";
import {
  getContactsAsync,
  Contact,
  EMAILS,
  PHONE_NUMBERS,
} from "expo-contacts";

type ContactsState = {
  loading: boolean;
  error: Error | null;
  data: Array<Contact>;
};

export const useContacts = () => {
  const [contacts, setContacts] = React.useState<ContactsState>({
    loading: true,
    error: null,
    data: [],
  });
  React.useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { status } = await Permissions.getAsync(Permissions.CONTACTS);
        if (status !== Permissions.PermissionStatus.GRANTED) {
          await Permissions.askAsync(Permissions.CONTACTS);
        }
        const data = await getContactsAsync({
          fields: [EMAILS, PHONE_NUMBERS],
        });
        setContacts((state) => ({
          loading: false,
          error: null,
          data: state.data.concat(data.data),
        }));
      } catch (ex) {
        setContacts({
          loading: false,
          error: ex,
          data: [],
        });
      }
    };

    fetchContacts();
  }, []);

  return contacts;
};
