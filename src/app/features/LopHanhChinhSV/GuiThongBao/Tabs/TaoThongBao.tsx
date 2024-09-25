import React from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

// import { getThongBaoGui, getThongBaoGuiTC } from "../../../../actions/hocTap";
// import { taoTBLopHC, taoTBLopTC } from "../../../../apis";
// import i18n from "../../../../assets/languages/i18n";
import R from '@assets/R';
// import BaseButton from "../../../../common/Button/BaseButton";
// import TextInputCommon from "../../../../common/Input/TextInputCommon";
// import UploadFile from "../../../../common/ItemView/UploadFile";
import { HEIGHT } from '@common';

// utils
// import Utils from "../../../../helpers/Utils";

const TaoThongBao = () => {
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => Keyboard.dismiss()}>
      <ScrollView
        style={styles.containerForm}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: HEIGHT(20) }}>
        {/* <TextInputCommon
            testID="ThongBaoInputTextNDTaoTieuDeThongBao"
            label={i18n.t("tieu_de")}
            defaultValue={tieuDe}
            required={true}
            textAlignVertical="center"
            placeholder={i18n.t("tieu_de_pl")}
            onValueChange={(value: any) => this.onValueChange(value, 0)}
            inputStyle={styles.input}
          />
          <TextInputCommon
            testID="ThongBaoInputTextNDTaoNoiDungThongBao"
            label={i18n.t("noi_dung")}
            defaultValue={noiDung}
            required={true}
            placeholder={i18n.t("noi_dung_pl")}
            multiline={true}
            textAlignVertical="top"
            onValueChange={(value: any) => this.onValueChange(value, 1)}
            inputStyle={styles.inputContent}
          />
          <UploadFile
            isRequired={false}
            arrayFile={arrayFile}
            customStyle={styles.viewUpload}
            changeListFile={this.onChangeFile}
            hideNotice
            customTitle={styles.title}
            backgroundColorItemFile={R.colors.white}
          />
          <BaseButton
            testID="GuiThongBaoLopHCGV"
            onPress={this.onPress}
            title={i18n.t("gui_tb")}
            style={styles.btnStyle}
          /> */}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default TaoThongBao;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.backgroundColorNew,
  },
  containerForm: {
    marginTop: HEIGHT(12),
  },
});
