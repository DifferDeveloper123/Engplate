const useremail = document.getElementById("email");
const mobileNumber = document.getElementById("mobile number");
const whatsappNumber = document.getElementById("whatsapp number");
const address = document.getElementById("address");
const thought = document.getElementById("thought");
const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb, degrees } = PDFLib;


const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val = capitalize(useremail.value);
  const mobVal = capitalize(mobileNumber.value);
  const whatsVal = capitalize(whatsappNumber.value);
  const addVal = capitalize(address.value);
  const thoughtVal = capitalize(thought.value);

  if (val.trim() !== "" && useremail.checkValidity() && mobVal.trim() !== "" && whatsVal.trim() !== "" && addVal.trim() !== "" && thoughtVal.trim() !== "") {
    generatePDF(val, mobVal, whatsVal, addVal, thoughtVal);
  } else {
    useremail.reportValidity();
    mobileNumber.reportValidity();
    whatsappNumber.reportValidity();
    address.reportValidity();
  }
});

const generatePDF = async (email, mobile, whatsapp, address, thought) => {
  const existingPdfBytes = await fetch("./English Coaching.pdf").then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  const fontBytes = await fetch("./VarelaRound-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  const VarelaRound = await pdfDoc.embedFont(fontBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  firstPage.drawText(email, {
    x: 290,
    y: 300,
    size: 10,
    font: VarelaRound,
    color: 	rgb(1,1,1),
  });

  firstPage.drawText(address, {
    x: 500,
    y: 300,
    size: 10,
    font: VarelaRound,
    color: 	rgb(1,1,1),
  });

  firstPage.drawText(mobile, {
    x: 290,
    y: 235,
    size: 10,
    font: VarelaRound,
    color: 	rgb(1,1,1),
  });

  firstPage.drawText(whatsapp, {
    x: 500,
    y: 235,
    size: 10,
    font: VarelaRound,
    color: 	rgb(1,1,1),
  });

  firstPage.drawText(thought, {
    x: 350,
    y: 450,
    size: 35,
    font: VarelaRound,
    color: 	rgb(1,1,1),
  });

  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  var file = new File(
    [pdfBytes],
    "English Template.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};

// init();