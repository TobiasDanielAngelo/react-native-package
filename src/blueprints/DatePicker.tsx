import moment from "moment";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { StateSetter } from "../constants/interfaces";
import { MyCalendar } from "./MyCalendar";
import { MyIcon } from "./MyIcon";
import { MyModal } from "./MyModal";

type DatePickerProps = {
  date: string;
  setDate: (t: string) => void;
  open: boolean;
  setOpen: StateSetter<boolean>;
};

export const DatePicker = ({
  date,
  setDate,
  open,
  setOpen,
}: DatePickerProps) => {
  const [value, setValue] = useState(moment(date, "MMM D, YYYY").toDate());
  const onPressCheck = () => {
    setDate(moment(value).format("MMM D, YYYY"));
    setOpen(false);
  };

  return (
    <MyModal isVisible={open} setVisible={setOpen}>
      <MyCalendar date={value} setDate={setValue} noModal />
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <MyIcon icon="check" onPress={onPressCheck} />
      </View>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 120,
    margin: "auto",
  },
});
