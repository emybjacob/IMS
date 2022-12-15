import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'; // Create styles

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    textAlign: "center"
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman"
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey"
  }
});

const PDFFile = () => {
  return /*#__PURE__*/React.createElement(Document, null, /*#__PURE__*/React.createElement("page", {
    style: styles.body
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.header,
    fixed: true
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.page
  }, " StockList ")));
};