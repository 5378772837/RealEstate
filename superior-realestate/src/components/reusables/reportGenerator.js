import React, { useState } from 'react'
import '../../css/pages/SignIn.css'
import '../../css/reusables/positions.css'
import jsPDF from "jspdf";
import "jspdf-autotable";
    // REMINDER, YOU MUST IMPORT jsPDF, jspdf-autotable, and format from dateFNS*******


  const  report= propertySales => {
    // initialize jsPDF
  const doc = new jsPDF();
    // define my columns
  const tableColumn = ["Id", "ADDRESS", "CITY", "STATE", "ZIP","SALE PRICE"];
    // define an empty array of rows
  const tableRows = [];

  // for each property sale pass all its data into an array
  propertySales.forEach(property => {
    const propertyData = [
      property.id,
      property.address,
      property.city,
      property.state,
      property.zip,
      property.salePrice,

    ];
    // push each property sale info into a row
    tableRows.push(propertyData);
  });

    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    // I use a date string to generate my filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // property info and margin-top + margin-left
    doc.text("Property Sales for the Requested Period", 14, 15);
    // I define the name of my PDF file.
    doc.save(`Sales_ report_${dateStr}.pdf`);
  };


export default report;