import * as React from "react";
import { type Contact } from "expo-contacts";
import * as Contacts from "expo-contacts";

type ContactsState = {
  loading: boolean;
  error: Error | null;
  data: Contact[];
};

export const useContacts = (): ContactsState => {
  const [contacts, setContacts] = React.useState<ContactsState>({
    loading: true,
    error: null,
    data: [],
  });
  React.useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== Contacts.PermissionStatus.GRANTED) {
          throw new Error("Permission not granted");
        }
        const data = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        });
        setContacts({
          loading: false,
          error: null,
          data: data.data,
        });
      } catch (error) {
        setContacts({
          loading: false,
          error: error as Error,
          data: [],
        });
      }
    };
    fetchContacts();
  }, []);

  return contacts;
};
