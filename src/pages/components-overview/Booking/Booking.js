import * as React from 'react';
import { useLocation } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Select, MenuItem, FormControl, InputLabel, Grid, Button, TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PaymentReceived from "../PaymentReceived/Payment"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RetentionProperty from '../Retention/RetentionProperty';
import { builderResponseData } from "../../../store/reducers/Builder/builderSlice"
import { createBooking, updateBooking } from "../../../store/reducers/Booking/createBookingSlice"
import { useDispatch, useSelector } from 'react-redux';
import { unitsResponseData } from 'store/reducers/Units/unitSlice';
import { usersResponseData } from 'store/reducers/Users/users';
import { Autocomplete, FormHelperText } from '../../../../node_modules/@mui/material/index';
import { projectResponseData } from 'store/reducers/Project/projectSlice';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { builderProjectResponse } from "../../../store/reducers/Booking/createBookingSlice"
import Alert from '@mui/material/Alert';


export default function Booking() {
  const dispatch = useDispatch();
  let { state } = useLocation();
  const prevPropsData = state?.some || {};
  const preBuilderData = useSelector((state) => state.booking.data)
  const [successMessage, setSuccessMessage] = React.useState({ type: '', message: '' });
  const [discounts, setDiscounts] = React.useState([]);
  const [otherDiscounts, setOtherDiscounts] = React.useState([]);
  const [paymentRecievedDetails, setPaymentRecievedDetails] = React.useState([]);
  const [retentionPropertyDetails, setRetentionpropertyDetails] = React.useState([]);
  const isDisabled = Object.keys(preBuilderData)?.includes('bookingId');



  useEffect(() => {
    prevPropsData?.bookingId && dispatch(builderProjectResponse({ payload: { bookingId: prevPropsData?.bookingId } }))
  }, [prevPropsData && isDisabled]);

  useEffect(() => {
    setValue({
      "bookingId": preBuilderData.bookingId || "",
      "bookingStatus": preBuilderData.bookingStatus || "",
      "bookingType": preBuilderData.bookingType || "",
      "bookingDate": preBuilderData.bookingDate || "",
      "scanLink": preBuilderData.scanLink || "",
      "bookingById": preBuilderData.bookingById || "",
      "bookingSharedById": preBuilderData.bookingSharedById || "",
      "branch": preBuilderData.branch || "",
      "builder": preBuilderData.builderDetails?.builder || "",
      "project": preBuilderData.builderDetails?.project || "",
      "unit": preBuilderData.builderDetails?.unit || "",
      "clientName": preBuilderData.clientDetails?.clientName || "",
      "clientContactNo": preBuilderData.clientDetails?.clientContactNo || "",
      "clientEmailId": preBuilderData.clientDetails?.clientEmailId || "",
      "clientAadhaarNo": preBuilderData.clientDetails?.clientAadhaarNo || "",
      "clientPanNo": preBuilderData.clientDetails?.clientPanNo || "",
      "clientCoApplicant": preBuilderData.clientDetails?.clientCoApplicant || "",
      "clientRemarks": preBuilderData.clientDetails?.clientRemarks || "",
      "brokerName": preBuilderData.brokerDetails?.brokerName || "",
      "brokerAmount": preBuilderData.brokerDetails?.brokerAmount || "",
      "brokerPanNo": preBuilderData.brokerDetails?.brokerPanNo || "",
      "brokerAadhaarNo": preBuilderData.brokerDetails?.brokerAadhaarNo || "",
      "brokerRemarks": preBuilderData.brokerDetails?.brokerRemarks || "",
      "bsp": preBuilderData.costRelatedDetails?.bsp || null,
      "gst": preBuilderData.costRelatedDetails?.gst || null,
      "discountSet": preBuilderData.costRelatedDetails?.discountSet || [],
      "otherChargesSet": preBuilderData.costRelatedDetails?.otherChargesSet || [],
      "amountReceivedDetails": preBuilderData?.amountReceivedDetails || [],
      "retentionDetails": preBuilderData.retentionDetails || [],
      "welcomeLetter": preBuilderData.agreementDetails?.welcomeLetter || "",
      "welcomeLetterDate": preBuilderData.agreementDetails?.welcomeLetterDate || null,
      "bba": preBuilderData.agreementDetails?.bba || "",
      "bbaDate": preBuilderData.agreementDetails?.bbaDate || null,
      "rc": preBuilderData.agreementDetails?.rc || "",
      "rcRemarks": preBuilderData.agreementDetails?.rcRemarks || "",
      "ra": preBuilderData.agreementDetails?.ra || "",
      "raRemarks": preBuilderData.agreementDetails?.raRemarks || null,
      "registry": preBuilderData.agreementDetails?.registry || "",
      "refundAmount": preBuilderData.refundDetails?.refundAmount || null,
      "refundReason": preBuilderData.refundDetails?.refundReason || "",
      "refundDate": preBuilderData.refundDetails?.refundDate || "",
      "incentive": preBuilderData.miscDetails?.incentive || "",
      "scheme": preBuilderData.miscDetails?.scheme || "",
      "sifStatus": preBuilderData.miscDetails?.sifStatus || "",
      "sifLink": preBuilderData.miscDetails?.sifLink || "",
      "bookingRemarks": preBuilderData.miscDetails?.bookingRemarks || ""
    });
    setPaymentRecievedDetails(preBuilderData.amountReceivedDetails || []);
    setDiscounts(preBuilderData.costRelatedDetails?.discountSet || []);
    setOtherDiscounts(preBuilderData.costRelatedDetails?.otherChargesSet || []);
    setRetentionpropertyDetails(preBuilderData.retentionDetails || []);
  }, [preBuilderData]);


  const formatDate = (dateString) => {
    if (dateString) {
      const date = dateString.split('T')[0];
      return date
    } else return;
  }

  const [getValue, setValue] = React.useState({
    "bookingStatus": "",
    "bookingType": "",
    "bookingDate": "",
    "scanLink": "",
    "bookingById": "",
    "bookingSharedById": "",
    "branch": "",
    "builder": "",
    "project": "",
    "unit": "",
    "clientName": "",
    "clientContactNo": "",
    "clientEmailId": "",
    "clientAadhaarNo": "",
    "clientPanNo": "",
    "clientCoApplicant": "",
    "clientRemarks": "",
    "brokerName": "",
    "brokerPanNo": "",
    "brokerAadhaarNo": "",
    "brokerRemarks": "",
    "brokerAmount": "",
    "bsp": null,
    "gst": null,
    "discountSet": discounts,
    "otherChargesSet": otherDiscounts,
    "amountReceivedDetails": paymentRecievedDetails || [],
    "retentionDetails": retentionPropertyDetails,
    "welcomeLetter": "",
    "welcomeLetterDate": null,
    "bba": "",
    "bbaDate": null,
    "rc": "",
    "rcRemarks": "",
    "ra": "",
    "raRemarks": null,
    "registry": "",
    "refundAmount": null,
    "refundReason": "",
    "refundDate": "",
    "incentive": "",
    "scheme": "",
    "sifStatus": "",
    "sifLink": "",
    "bookingRemarks": ""
  });
  const { bookingStatus, bookingType, bookingDate, brokerAmount, scanLink, bookingById, bookingSharedById, branch, builder, project, unit, clientName, clientContactNo, clientEmailId, clientAadhaarNo, clientPanNo, clientCoApplicant, clientRemarks, brokerName, brokerPanNo, brokerAadhaarNo, brokerRemarks, bsp, gst, discountSet, otherChargesSet, amountReceivedDetails, retentionDetails, welcomeLetter, welcomeLetterDate, bba, bbaDate, rc, rcRemarks, ra, raRemarks, registry, refundAmount, refundReason, refundDate, incentive, scheme, sifStatus, sifLink, bookingRemarks } = getValue;

  const [errors, setErrors] = React.useState({
    "bookingStatus": "",
    "bookingType": "",
    "bookingDate": "",
    "scanLink": "",
    "bookingById": "",
    "branch": "",
    "builder": "",
    "project": "",
    "clientName": "",
    "clientContactNo": "",
    "clientEmailId": "",
    "clientAadhaarNo": "",
    "clientPanNo": "",
    "unit": "",
    "bsp": "",
    "gst": "",
    "amountReceivedDetails": "",
    "retentionDetails": "",
    "welcomeLetter": "",
    "welcomeLetterDate": "",
    "bba": "",
    "bbaDate": "",
    "rc": "",
    "ra": "",
    "raRemarks": "",
    "registry": "",
    "incentive": "",
    "scheme": "",
    "sifStatus": "",
    "sifLink": "",
  });
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === 'brokerName') {
      if (value === '') {
        setErrors({ ...errors, brokerPanNo: '', brokerAmount: '', brokerAadhaarNo: '' });
      }
    }
    if (!Object.keys(errors).includes(name)) {
      if (type === 'number') {
        setValue({ ...getValue, [name]: value.replace(/[^0-9]/g, "") });
      } else
        setValue({ ...getValue, [name]: value });
    } else {
      if (type === 'number') {
        setErrors({ ...errors, [name]: "" });
        setValue({ ...getValue, [name]: value.replace(/[^0-9]/g, "") });
      } else
        setErrors({ ...errors, [name]: "" });
      setValue({ ...getValue, [name]: value });
    }
    setSuccessMessage({ type: '', message: '' });
  };

  const navigate = useNavigate();
  const checkValidation = () => {
    const _errors = errors;
    let isValidate = true;
    if (!bookingStatus || bookingStatus.trim() == "") {
      _errors.bookingStatus = 'Booking Status is Required';
      isValidate = false;
    } else _errors.bookingStatus = ""
    if (!bookingType || bookingType.trim() == "") {
      _errors.bookingType = 'Booking Type is Required';
      isValidate = false;
    } else _errors.bookingType = ""
    if (!bookingDate || bookingDate.trim() == "") {
      _errors.bookingDate = 'Booking Date is Required';
      isValidate = false;
    } else _errors.bookingStatus = ""
    if (!scanLink || scanLink.trim() == "") {
      _errors.scanLink = 'Scan Link is Required';
      isValidate = false;
    } else _errors.scanLink = ""
    if (!bookingById || bookingById.trim() == "") {
      _errors.bookingById = 'Booking By is Required';
      isValidate = false;
    } else _errors.bookingById = ""
    if (!branch || branch.trim() == "") {
      _errors.branch = 'Branch is Required';
      isValidate = false;
    } else _errors.branch = ""
    if (!builder || builder.trim() == "") {
      _errors.builder = 'Builder is Required';
      isValidate = false;
    } else _errors.builder = ""
    if (!project || project.trim() == "") {
      _errors.project = 'Project is Required';
      isValidate = false;
    } else _errors.project = ""
    if (!unit || unit.trim() == "") {
      _errors.unit = 'Unit is Required';
      isValidate = false;
    } else _errors.unit = ""
    if (!clientName || clientName.trim() == "") {
      _errors.clientName = 'Client Name is Required';
      isValidate = false;
    } else _errors.clientName = ""
    if (!clientEmailId || clientEmailId.trim() == "") {
      _errors.clientEmailId = 'Client EmailId is Required';
      isValidate = false;
    } else _errors.clientEmailId = ""
    if (!clientContactNo) {
      _errors.clientContactNo = 'Client ContactNo is Required';
      isValidate = false;
    } else _errors.clientContactNo = ""
    if (!clientPanNo || clientPanNo.trim() == "") {
      _errors.clientPanNo = 'Client PanNo is Required';
      isValidate = false;
    } else _errors.clientPanNo = ""
    if (!clientAadhaarNo || clientAadhaarNo.trim() == "") {
      _errors.clientAadhaarNo = 'Client Aadhaar No is Required';
      isValidate = false;
    } else _errors.clientAadhaarNo = ""
    if (!bsp) {
      _errors.bsp = 'Bsp is Required';
      isValidate = false;
    } else _errors.bsp = ""
    if (!gst) {
      _errors.gst = 'Gst is Required';
      isValidate = false;
    } else _errors.gst = ""
    if (!amountReceivedDetails || amountReceivedDetails.length === 0) {
      _errors.amountReceivedDetails = 'Payment Received Details is Required';
      isValidate = false;
    } else _errors.amountReceivedDetails = ""
    if (!welcomeLetter || welcomeLetter.trim() == "") {
      _errors.welcomeLetter = 'welcome Letter is Required';
      isValidate = false;
    } else _errors.welcomeLetter = ""
    if (welcomeLetter === 'YES' && (!welcomeLetterDate || welcomeLetterDate.trim() == "")) {
      _errors.welcomeLetterDate = 'Welcome Letter Date is Required';
      isValidate = false;
    } else _errors.welcomeLetterDate = ""
    if (!bba || bba.trim() == "") {
      _errors.bba = 'Bba is Required';
      isValidate = false;
    } else _errors.bba = ""
    if (bba === 'YES' && (!bbaDate || bbaDate.trim() == "")) {
      _errors.bbaDate = 'Bba Date is Required';
      isValidate = false;
    } else _errors.bbaDate = ""
    if (!rc || rc.trim() == "") {
      _errors.rc = 'Rc is Required';
      isValidate = false;
    } else _errors.rc = ""
    if (!ra || ra.trim() == "") {
      _errors.ra = 'Ra is Required';
      isValidate = false;
    } else _errors.ra = ""
    if (!registry || registry.trim() == "") {
      _errors.registry = 'Registry is Required';
      isValidate = false;
    } else _errors.registry = ""
    if (!incentive || incentive.trim() == "") {
      _errors.incentive = 'Incentive is Required';
      isValidate = false;
    } else _errors.incentive = ""
    if (!scheme || scheme.trim() == "") {
      _errors.scheme = 'Scheme is Required';
      isValidate = false;
    } else _errors.scheme = ""
    if (!sifStatus || sifStatus.trim() == "") {
      _errors.sifStatus = 'Sif Status is Required';
      isValidate = false;
    } else _errors.sifStatus = ""
    if (!sifLink || sifLink.trim() == "") {
      _errors.sifLink = 'Sif Link is Required';
      isValidate = false;
    } else _errors.sifLink = "";
    if (brokerName.length !== 0) {
      setErrors({ ...errors, brokerPanNo: '', brokerAmount: '', brokerAadhaarNo: '' });
      if (!brokerAmount) {
        _errors.brokerAmount = 'Amount is Required';
        isValidate = false;
      } else {
        _errors.brokerAmount = "";
      } if (!brokerAadhaarNo || brokerAadhaarNo.trim() === "") {
        _errors.brokerAadhaarNo = 'Aadhar Number is Required';
        isValidate = false;
      } else {
        _errors.brokerAadhaarNo = "";
      } if (!brokerPanNo || brokerPanNo.trim() === "") {
        _errors.brokerPanNo = 'Pan Number is Required';
        isValidate = false;
      } else {
        _errors.brokerPanNo = "";
      }
    } else {
      setErrors({ ...errors, brokerPanNo: '', brokerAmount: '', brokerAadhaarNo: '' });
    }
    setErrors({ ..._errors });
    return isValidate;
  };
  async function handleSubmit(event) {
    event.preventDefault();
    if (!checkValidation()) {
      setSuccessMessage({ type: 'error', message: 'Please Check Values !' })
      return;
    } else {
      try {
        if (!isDisabled) {
          await dispatch(createBooking(getValue));
        } else {
          await dispatch(updateBooking(getValue, prevPropsData?.bookingId))
        }
        setValue({
          "bookingStatus": "",
          "bookingType": "",
          "bookingDate": "",
          "scanLink": "",
          "bookingById": "",
          "bookingSharedById": "",
          "branch": "",
          "builder": "",
          "project": "",
          "unit": "",
          "clientName": "",
          "clientContactNo": "",
          "clientEmailId": "",
          "clientAadhaarNo": "",
          "clientPanNo": "",
          "clientCoApplicant": "",
          "clientRemarks": "",
          "brokerName": "",
          "brokerPanNo": "",
          "brokerAadhaarNo": "",
          "brokerRemarks": "",
          "brokerAmount": "",
          "bsp": null,
          "gst": null,
          "discountSet": discounts,
          "otherChargesSet": otherDiscounts,
          "amountReceivedDetails": paymentRecievedDetails || [],
          "retentionDetails": retentionPropertyDetails,
          "welcomeLetter": "",
          "welcomeLetterDate": null,
          "bba": "",
          "bbaDate": null,
          "rc": "",
          "rcRemarks": "",
          "ra": "",
          "raRemarks": null,
          "registry": "",
          "refundAmount": null,
          "refundReason": "",
          "refundDate": "",
          "incentive": "",
          "scheme": "",
          "sifStatus": "",
          "sifLink": "",
          "bookingRemarks": ""
        });
        navigate('/bookinglist')
        setSuccessMessage({ type: 'success', message: 'Data updated successfully' });
      } catch (error) {
        setSuccessMessage({ type: 'error', message: error.message });
      }
    }
  }
  useEffect(() => {
    setValue({ ...getValue, ['discountSet']: discounts, ['otherChargesSet']: otherDiscounts, ['amountReceivedDetails']: paymentRecievedDetails, ['retentionDetails']: retentionPropertyDetails });
  }, [discounts, otherDiscounts, paymentRecievedDetails, retentionPropertyDetails])



  const builderdata = useSelector((state) => state.builderSlice.data);
  let builderProjectResp = useSelector((state) => state.projectSlice.data);
  const unitsData = useSelector((state) => state.unitSlice.data);
  const usersData = useSelector((state) => state.usersSlice.data);

  useEffect(() => {
    builderdata.length === 0 && dispatch(builderResponseData());
    if (builder != '') {
      dispatch(projectResponseData({ builder: builder }))
    }
    if (project != '') {
      dispatch(unitsResponseData({ projectId: project }))
    }
    if (usersData.length === 0) {
      dispatch(usersResponseData())
    }

  }, [builder, dispatch, project]);

  const [open, setOpen] = React.useState(false);
  const [otherPopUp, setotherPopUp] = React.useState(false);
  const [paymentReceived, setpaymentReceived] = React.useState(false);
  const [Retentionproperty, setRetentionproperty] = React.useState(false);
  const [currentDiscount, setCurrentDiscount] = React.useState({ id: undefined, discountType: '', discountAmount: '' });
  const [currentDiscountError, setCurrentDiscountError] = React.useState({ discountType: '', discountAmount: '' });

  const handleSave = () => {
    if (currentDiscount.discountType != '' && currentDiscount.discountAmount != '') {
      if (currentDiscount.id !== undefined && currentDiscount.id <= discounts.length) {
        const updatedDiscounts = [...discounts];
        updatedDiscounts[currentDiscount.id] = {
          discountType: currentDiscount.discountType,
          discountAmount: Number(currentDiscount.discountAmount),
        };
        setDiscounts(updatedDiscounts);
      } else {
        setDiscounts([...discounts, { discountType: currentDiscount.discountType, discountAmount: Number(currentDiscount.discountAmount) }])
      }
      setOpen(false);
    } else {
      if (currentDiscount.discountType == '' && currentDiscount.discountAmount == '') {
        setCurrentDiscountError({ discountType: 'Discount Type Is Required', discountAmount: 'Discount Amount Is Required' })
      } else if (currentDiscount.discountType === '') {
        setCurrentDiscountError({ ...currentDiscountError, discountType: 'Discount Type Is Required' })
      } else if (currentDiscount.discountAmount === '') {
        setCurrentDiscountError({ ...currentDiscountError, discountAmount: 'Discount Amount Is Required' })
      }
    }
  };
  const handleDiscountEdit = (item, index) => {
    setOpen(true);
    setCurrentDiscount({ id: index, discountType: item.discountType, discountAmount: item.discountAmount });
    setCurrentDiscountError({ discountType: '', discountAmount: '' });
  }
  const handleClickOpen = () => {
    setOpen(true);
    setCurrentDiscount({ discountType: '', discountAmount: '' });
    setCurrentDiscountError({ discountType: '', discountAmount: '' });
  };
  const [currentOtherDiscounts, setCurrentOtherDiscounts] = React.useState({ id: undefined, otherChargeName: "", otherChargeAmount: '' });
  const [currentOtherDiscountsError, setCurrentOtherDiscountsError] = React.useState({ otherChargeName: "", otherChargeAmount: "" });

  const handleOtherChargesEdit = (item, index) => {
    setotherPopUp(true)
    setCurrentOtherDiscounts({ id: index, otherChargeName: item.otherChargeName, otherChargeAmount: item.otherChargeAmount });
    setCurrentOtherDiscountsError({ otherChargeName: "", otherChargeAmount: "" });
  }
  // Other Charges 
  const OtherCharges = () => {
    setotherPopUp(true)
    setCurrentOtherDiscounts({ otherChargeName: "", otherChargeAmount: '' });
    setCurrentOtherDiscountsError({ otherChargeName: "", otherChargeAmount: "" });
  }
  const handleSaveOther = () => {
    if (currentOtherDiscounts.otherChargeAmount != '' && currentOtherDiscounts.otherChargeName != '') {
      if (currentOtherDiscounts.id != undefined && currentOtherDiscounts.id <= otherDiscounts.length) {
        const updatedOtherDiscounts = [...otherDiscounts];
        updatedOtherDiscounts[currentOtherDiscounts.id] = {
          otherChargeName: currentOtherDiscounts.otherChargeName,
          otherChargeAmount: Number(currentOtherDiscounts.otherChargeAmount),
        };
        setOtherDiscounts(updatedOtherDiscounts);
      } else {
        setOtherDiscounts([...otherDiscounts, { otherChargeName: currentOtherDiscounts.otherChargeName, otherChargeAmount: Number(currentOtherDiscounts.otherChargeAmount) }]);
      }
      setotherPopUp(false)
    } else {
      if (currentOtherDiscounts.otherChargeName == '' && currentOtherDiscounts.otherChargeAmount == '') {
        setCurrentOtherDiscountsError({ otherChargeName: 'Charge Name is Required', otherChargeAmount: 'Charge Amount Is Required' })
      } else if (currentOtherDiscounts.otherChargeName == '') {
        setCurrentOtherDiscountsError({ ...currentOtherDiscountsError, otherChargeName: 'Charge Name is Required' })
      } else if (currentOtherDiscounts.otherChargeAmount == '') {
        setCurrentOtherDiscountsError({ ...currentOtherDiscountsError, otherChargeAmount: 'Charge Amount Is Required' })
      }
    }
  }

  // Payment Received 
  const [currentPaymentRecievedDetails, setCurrentPaymentRecvedDetails] = React.useState({
    "amountReceived": null,
    "paymentMode": "",
    "paymentTransactionNumber": "",
    "bankName": "",
    "amountRemarks": "",
    "date": "",
    "receipt": null,
    "receiptDate": "",
    "paymentStatus": "",
    "paymentStatusComment": "",
    "id": undefined
  })
  const [currentPaymentRecievedDetailsErros, setCurrentPaymentRecvedDetailsErros] = React.useState({
    "amountReceived": "",
    "paymentMode": "",
    "date": "",
    "receipt": "",
    "paymentStatus": ""
  })
  const checkPaymentRecievedValidation = () => {
    let _errors = currentPaymentRecievedDetailsErros;
    let isValidate = true;
    if (!currentPaymentRecievedDetails.amountReceived) {
      _errors.amountReceived = "Amount Recieved is Required"
      isValidate = false;
    } else _errors.amountReceived = "";
    if (!currentPaymentRecievedDetails.paymentMode) {
      _errors.paymentMode = "Payment Mode is Required"
      isValidate = false;
    } else _errors.paymentMode = "";
    if (!currentPaymentRecievedDetails.date) {
      _errors.date = "Date is Required"
      isValidate = false;
    } else _errors.date = "";
    if (!currentPaymentRecievedDetails.receipt) {
      _errors.receipt = "Receipt is Required"
      isValidate = false;
    } else _errors.receipt = "";
    if (!currentPaymentRecievedDetails.paymentStatus) {
      _errors.paymentStatus = "Payment Status is Required"
      isValidate = false;
    } else _errors.paymentStatus = "";
    setCurrentPaymentRecvedDetailsErros({ ..._errors });
    return isValidate;
  }
  const handlePaymentReceived = () => {
    setpaymentReceived(true)
    setCurrentPaymentRecvedDetails({
      "amountReceived": null,
      "paymentMode": "",
      "paymentTransactionNumber": "",
      "bankName": "",
      "amountRemarks": "",
      "date": "",
      "receipt": null,
      "receiptDate": "",
      "paymentStatus": "",
      "paymentStatusComment": ""
    });
    setCurrentPaymentRecvedDetailsErros({
      "amountReceived": "",
      "paymentMode": "",
      "date": "",
      "receipt": "",
      "paymentStatus": ""
    });
  }
  const handlePaymentDetailsEdit = (item, index) => {
    setpaymentReceived(true);
    setCurrentPaymentRecvedDetails({ ...item, id: index, date: formatDate(item.date), receiptDate: formatDate(item.receiptDate) });
    setCurrentPaymentRecvedDetailsErros({
      "amountReceived": "",
      "paymentMode": "",
      "date": "",
      "receipt": "",
      "paymentStatus": ""
    });
  }
  const handleSavePaymentDetails = () => {
    if (!checkPaymentRecievedValidation()) return;
    else {
      if (currentPaymentRecievedDetails.id !== undefined && currentPaymentRecievedDetails.id <= paymentRecievedDetails.length) {
        const updatedPaymentDetails = [...paymentRecievedDetails];
        updatedPaymentDetails[currentPaymentRecievedDetails.id] = {
          "amountReceived": Number(currentPaymentRecievedDetails.amountReceived),
          "paymentMode": currentPaymentRecievedDetails.paymentMode,
          "paymentTransactionNumber": currentPaymentRecievedDetails.paymentTransactionNumber,
          "bankName": currentPaymentRecievedDetails.bankName,
          "amountRemarks": currentPaymentRecievedDetails.amountRemarks,
          "date": currentPaymentRecievedDetails.date,
          "receipt": currentPaymentRecievedDetails.receipt,
          "receiptDate": currentPaymentRecievedDetails.receiptDate,
          "paymentStatus": currentPaymentRecievedDetails.paymentStatus,
          "paymentStatusComment": currentPaymentRecievedDetails.paymentStatusComment
        };
        setPaymentRecievedDetails(updatedPaymentDetails);
      } else {
        setPaymentRecievedDetails([...paymentRecievedDetails, {
          "amountReceived": Number(currentPaymentRecievedDetails.amountReceived),
          "paymentMode": currentPaymentRecievedDetails.paymentMode,
          "paymentTransactionNumber": currentPaymentRecievedDetails.paymentTransactionNumber,
          "bankName": currentPaymentRecievedDetails.bankName,
          "amountRemarks": currentPaymentRecievedDetails.amountRemarks,
          "date": currentPaymentRecievedDetails.date,
          "receipt": currentPaymentRecievedDetails.receipt,
          "receiptDate": currentPaymentRecievedDetails.receiptDate,
          "paymentStatus": currentPaymentRecievedDetails.paymentStatus,
          "paymentStatusComment": currentPaymentRecievedDetails.paymentStatusComment
        }]);
      }
      setErrors({ ...errors, 'amountReceivedDetails': '' });
      setpaymentReceived(false);
    }
  }
  // Retention Property
  const [currentRetentionDetails, setCurrentRetentionDetails] = React.useState({
    "builder": "",
    "project": "",
    "selfPaidAmount": null,
    "unitNo": "",
    "loanAmount": null,
    "otherAmount": null,
    "oldPropertyPaperStatus": "",
    "propertyTransferType": "",
    "oldPropertyLink": "",
    "caseStudyApprovalLink": "",
    "retentionRemarks": ""
  })
  const [currentRetentionDetailsErrors, setCurrentRetentionDetailsErrors] = React.useState({
    "project": "",
    "unitNo": "",
    "oldPropertyPaperStatus": "",
    "propertyTransferType": ""
  });
  const checkRetentionDetailsValidation = () => {
    let _errors = currentRetentionDetailsErrors;
    let isValidate = true;
    if (!currentRetentionDetails.project) {
      _errors.project = "Project is Required"
      isValidate = false;
    } else _errors.project = "";
    if (!currentRetentionDetails.unitNo) {
      _errors.unitNo = "unit No is Required"
      isValidate = false;
    } else _errors.unitNo = "";
    if (!currentRetentionDetails.oldPropertyPaperStatus) {
      _errors.oldPropertyPaperStatus = "Old Property Paper Status is Required"
      isValidate = false;
    } else _errors.oldPropertyPaperStatus = "";
    if (!currentRetentionDetails.propertyTransferType) {
      _errors.propertyTransferType = "Property TransferType is Required"
      isValidate = false;
    } else _errors.propertyTransferType = "";
    setCurrentRetentionDetailsErrors({ ..._errors });
    return isValidate;
  }
  const handleSaveRetentionProperty = () => {
    if (!checkRetentionDetailsValidation()) return;
    else {
      setRetentionpropertyDetails([...retentionPropertyDetails, {
        "builder": currentRetentionDetails.builder,
        "project": currentRetentionDetails.project,
        "selfPaidAmount": Number(currentRetentionDetails.selfPaidAmount),
        "unitNo": currentRetentionDetails.unitNo,
        "loanAmount": Number(currentRetentionDetails.loanAmount),
        "otherAmount": Number(currentRetentionDetails.otherAmount),
        "oldPropertyPaperStatus": currentRetentionDetails.oldPropertyPaperStatus,
        "propertyTransferType": currentRetentionDetails.propertyTransferType,
        "oldPropertyLink": currentRetentionDetails.oldPropertyLink,
        "caseStudyApprovalLink": currentRetentionDetails.caseStudyApprovalLink,
        "retentionRemarks": currentRetentionDetails.retentionRemarks
      }])
      setRetentionproperty(false)
    }
  }
  const handleRetentionProperty = () => {
    setRetentionproperty(true)
    setCurrentRetentionDetails({
      "builder": "",
      "project": "",
      "selfPaidAmount": null,
      "unitNo": "",
      "loanAmount": null,
      "otherAmount": null,
      "oldPropertyPaperStatus": "",
      "propertyTransferType": "",
      "oldPropertyLink": "",
      "caseStudyApprovalLink": "",
      "retentionRemarks": ""
    });
    setCurrentRetentionDetailsErrors({
      "project": "",
      "unitNo": "",
      "oldPropertyPaperStatus": "",
      "propertyTransferType": ""
    });
  }
  const handleClose = () => {
    setOpen(false);
    setotherPopUp(false)
    setpaymentReceived(false)
    setRetentionproperty(false)
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>

            {/* Basic Booking Details */}
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant='h5'>Basic Booking Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {/* Booking Status  */}
                  <Grid item xs={6}>
                    <InputLabel required>Booking Status</InputLabel>
                    <Select
                      fullWidth
                      required
                      value={bookingStatus}
                      name='bookingStatus'
                      onChange={handleChange}
                    >
                      <MenuItem value="LIVE">Live</MenuItem>
                      <MenuItem value="UNDER_PROCESS">Underprocess</MenuItem>
                      <MenuItem value="CLIENT_CANCEL">Client Cancel</MenuItem>
                      <MenuItem value="BUILDER_CANCEL">Builder Cancel</MenuItem>
                      <MenuItem value="TRANSFER_PROPERTY">Transfer Property</MenuItem>
                    </Select>
                    {errors.bookingStatus && (
                      <FormHelperText error>{errors.bookingStatus}</FormHelperText>
                    )}
                  </Grid>
                  {/* Booking Type  */}
                  <Grid item xs={6}>
                    <InputLabel required>Booking Type</InputLabel>
                    <Select
                      fullWidth
                      required
                      value={bookingType}
                      name='bookingType'
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      onChange={handleChange}
                    >
                      <MenuItem value="FRESH">Fresh</MenuItem>
                      <MenuItem value="RETENTION">Retention</MenuItem>
                      <MenuItem value="FUND_TRANSFER">Fund Transfer</MenuItem>
                    </Select>
                    {errors.bookingType && (
                      <FormHelperText error>{errors.bookingType}</FormHelperText>
                    )}
                  </Grid>
                  {/* Booking Date  */}
                  <Grid item xs={6}>
                    <TextField
                      required
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      style={{ width: '100%' }}
                      variant="outlined"
                      name='bookingDate'
                      value={formatDate(bookingDate)}
                      onChange={handleChange}
                      fullWidth
                      label="Booking Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.bookingDate && (
                      <FormHelperText error>{errors.bookingDate}</FormHelperText>
                    )}
                  </Grid>
                  {/* Scan Link  */}
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      required
                      label="Booking Scan Link"
                      type="text"
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      id="fullWidth outlined-error"
                      value={scanLink}
                      name='scanLink'
                      onChange={handleChange}
                    />
                    {errors.scanLink && (
                      <FormHelperText error>{errors.scanLink}</FormHelperText>
                    )}
                  </Grid>
                  {/* BookingBy  */}
                  <Grid item xs={6}>
                    <InputLabel required>Booking By</InputLabel>
                    <Select
                      fullWidth
                      required
                      value={bookingById}
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      name='bookingById'
                      onChange={handleChange}
                    >
                      {usersData && usersData.map((item, idx) => {
                        return (<MenuItem value={item.employeeId} key={idx}>{item.fullName}</MenuItem>)
                      })}
                    </Select>
                    {errors.bookingById && (
                      <FormHelperText error>{errors.bookingById}</FormHelperText>
                    )}
                  </Grid>
                  {/* BookingSharedBy  */}
                  <Grid item xs={6}>
                    <InputLabel>Booking Shared By</InputLabel>
                    <Select
                      fullWidth
                      value={bookingSharedById}
                      onChange={handleChange}
                      name='bookingSharedById'
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                    >
                      {usersData && usersData.map((item, idx) => {
                        return (<MenuItem value={item.employeeId} key={idx}>{item.fullName}</MenuItem>)
                      })}
                    </Select>
                    {errors.bookingSharedById && (
                      <FormHelperText error>{errors.bookingSharedById}</FormHelperText>
                    )}
                  </Grid>
                  {/* Branching  */}
                  <Grid item xs={12}>
                    <InputLabel required>Branch</InputLabel>
                    <Select
                      fullWidth
                      required
                      value={branch}
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      name='branch'
                      onChange={handleChange}
                    >
                      <MenuItem value="Noida 63">Noida 63</MenuItem>
                      <MenuItem value="Rajnagar extension">Rajnagar extension</MenuItem>
                      <MenuItem value="Gurgaon 65">Gurgaon 65</MenuItem>
                      <MenuItem value="pune">Pune</MenuItem>
                    </Select>
                    {errors.branch && (
                      <FormHelperText error>{errors.branch}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant='h5'>Builder & Project</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    {/* Builder */}
                    <InputLabel required>Builder</InputLabel>
                    <Autocomplete
                      fullWidth
                      required
                      value={builder ? builderdata?.content?.find((item) => item.builderId === builder)?.builderName : ''}
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      name='builder'
                      onChange={(event, newValue) => {
                        if (newValue) {
                          const selectedBuilder = builderdata?.content?.find((item) => item.builderName === newValue);
                          handleChange({ target: { name: 'builder', value: selectedBuilder?.builderId } });
                        }
                      }}
                      options={builderdata?.content?.map((item) => item.builderName) || []}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} InputProps={{
                            ...params.InputProps,
                            style: { padding: '3px' },
                            endAdornment: (
                              <div
                                style={{
                                  left: 'calc(100%)', top: 'calc(50% - 5px)', position: 'absolute', whiteSpace: 'nowrap'
                                }}
                              >
                                {params.InputProps.endAdornment}
                              </div>
                            )
                          }} />
                        )
                      }}
                    />
                    {errors.builder && (
                      <FormHelperText error>{errors.builder}</FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={8}>
                    {/* Project */}
                    <InputLabel required>Project</InputLabel>
                    <Autocomplete
                      fullWidth
                      required
                      value={project ? builderProjectResp?.content?.find((item) => item.projectId === project)?.projectName : ''}
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      name='project'
                      onChange={(event, newValue) => {
                        if (newValue) {
                          const selectedBuilder = builderProjectResp?.content?.find((item) => item.projectName === newValue);
                          handleChange({ target: { name: 'project', value: selectedBuilder?.projectId } });
                        }
                      }}
                      options={builderProjectResp?.content?.map((item) => item.projectName) || []}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} InputProps={{
                            ...params.InputProps,
                            style: { padding: '3px' },
                            endAdornment: (
                              <div
                                style={{
                                  left: 'calc(100%)', top: 'calc(50% - 5px)', position: 'absolute', whiteSpace: 'nowrap'
                                }}
                              >
                                {params.InputProps.endAdornment}
                              </div>
                            )
                          }} />
                        )
                      }}
                    />
                    {errors.project && (
                      <FormHelperText error>{errors.project}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={16}>
                    {/* Unit */}
                    <InputLabel required>Unit</InputLabel>
                    <Autocomplete
                      fullWidth
                      required
                      value={unit ? unitsData?.content?.find((item) => item.unitId === unit)?.unitNumber : ''}
                      name='unit'
                      onChange={(event, newValue) => {
                        if (newValue) {
                          const selectedBuilder = unitsData?.content?.find((item) => item.unitNumber === newValue);
                          handleChange({ target: { name: 'unit', value: selectedBuilder?.unitId } });
                        }
                      }}
                      options={unitsData?.content?.map((item) => item.unitNumber) || []}
                      renderInput={(params) => {
                        return (
                          <TextField {...params} InputProps={{
                            ...params.InputProps,
                            style: { padding: '3px' },
                            endAdornment: (
                              <div
                                style={{
                                  left: 'calc(100%)', top: 'calc(50% - 5px)', position: 'absolute', whiteSpace: 'nowrap'
                                }}
                              >
                                {params.InputProps.endAdornment}
                              </div>
                            )
                          }} />
                        )
                      }}
                    />
                    {errors.unit && (
                      <FormHelperText error>{errors.unit}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            {/* Client  */}
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant='h5'>Client</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    {/* Client Name */}
                    <TextField
                      fullWidth
                      label="Client Name"
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      type="text"
                      required
                      id="fullWidth"
                      name='clientName'
                      value={clientName}
                      onChange={handleChange}
                    />
                    {errors.clientName && (
                      <FormHelperText error>{errors.clientName}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    {/* Client Email */}
                    <TextField
                      fullWidth
                      label="Client Email"
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      type="email"
                      required
                      id="fullWidth"
                      name='clientEmailId'
                      value={clientEmailId}
                      onChange={handleChange}
                    />
                    {errors.clientEmailId && (
                      <FormHelperText error>{errors.clientEmailId}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    {/* Client Contact No / Phone No */}
                    <TextField
                      fullWidth
                      label="Client Contact No / Phone No"
                      type="text"
                      required
                      id="fullWidth"
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      name='clientContactNo'
                      value={clientContactNo}
                      onChange={handleChange}
                    />
                    {errors?.clientContactNo && (
                      <FormHelperText error>{errors.clientContactNo}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    {/* Client Pan No */}
                    <TextField
                      fullWidth
                      label="Client Pan No"
                      type="text"
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      required
                      id="fullWidth"
                      name='clientPanNo'
                      value={clientPanNo}
                      onChange={handleChange}
                    />
                    {errors?.clientPanNo && (
                      <FormHelperText error>{errors.clientPanNo}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    {/* Client Aadhaar No */}
                    <TextField
                      fullWidth
                      label="Client Aadhaar No"
                      type="text"
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      required
                      id="fullWidth"
                      maxLength={16}
                      name='clientAadhaarNo'
                      value={clientAadhaarNo}
                      onChange={handleChange}
                    />
                    {errors?.clientAadhaarNo && (
                      <FormHelperText error>{errors.clientAadhaarNo}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    {/* Co-Applicant */}
                    <TextField
                      fullWidth
                      label="Co-Applicant"
                      type="text"
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      id="fullWidth"
                      name='clientCoApplicant'
                      value={clientCoApplicant}
                      onChange={handleChange}
                    />
                    {errors?.clientCoApplicant && (
                      <FormHelperText error>{errors.clientCoApplicant}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    {/* Remarks */}
                    <TextareaAutosize
                      color="success"
                      placeholder="Remarks"
                      minRows={8}
                      style={{ width: '203%' }}
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      value={clientRemarks}
                      name='clientRemarks'
                      onChange={handleChange}
                    />
                    {errors.clientRemarks && (
                      <FormHelperText error>{errors.clientRemarks}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            {/* Broker  */}
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant='h5'>Broker</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    {/* Broker Name */}
                    <TextField
                      fullWidth
                      label="Broker Name"
                      disabled={bookingStatus === 'UNDER_PROCESS' ? false : isDisabled}
                      type="text"
                      id="fullWidth"
                      name='brokerName'
                      value={brokerName}
                      onChange={handleChange}
                    />
                    {errors.brokerName && (
                      <FormHelperText error>{errors.brokerName}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    {/* Broker Pan No */}
                    <TextField
                      fullWidth
                      disabled={brokerName.length === 0}
                      label="Broker Pan No"
                      type="text"
                      required
                      id="fullWidth"
                      name='brokerPanNo'
                      value={brokerPanNo}
                      onChange={handleChange}
                    />
                    {errors.brokerPanNo && (
                      <FormHelperText error>{errors.brokerPanNo}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    {/* Broker Amount */}
                    <TextField
                      fullWidth
                      disabled={brokerName.length === 0}
                      label="Broker Amount"
                      type="number"
                      required
                      id="fullWidth"
                      name='brokerAmount'
                      value={brokerAmount}
                      onChange={handleChange}
                    />
                    {errors.brokerAmount && (
                      <FormHelperText error>{errors.brokerAmount}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    {/* Broker Aadhaar No */}
                    <TextField
                      fullWidth
                      disabled={brokerName.length === 0}
                      label="Broker Aadhaar No"
                      type="text"
                      required
                      id="fullWidth"
                      name='brokerAadhaarNo'
                      value={brokerAadhaarNo}
                      onChange={handleChange}
                    />
                    {errors.brokerAadhaarNo && (
                      <FormHelperText error>{errors.brokerAadhaarNo}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    {/* Remarks */}
                    <TextareaAutosize
                      disabled={brokerName.length === 0}
                      color="success"
                      minRows={2}
                      style={{ width: '100%' }}
                      placeholder="Remarks"
                      name='brokerRemarks'
                      value={brokerRemarks}
                      onChange={handleChange}
                    />
                    {errors.brokerRemarks && (
                      <FormHelperText error>{errors.brokerRemarks}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            {/* Cost  */}
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant='h5'>Cost Related</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* BSP */}
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      required
                      label="BSP"
                      type="text"
                      InputLabelProps={{ shrink: true, }}
                      id="fullWidth outlined-error"
                      name='bsp'
                      value={bsp}
                      onChange={handleChange}
                    />
                    {errors.bsp && (
                      <FormHelperText error>{errors.bsp}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth

                      label="GST"
                      type="number"
                      InputLabelProps={{ shrink: true, }}
                      id="fullWidth outlined-error"
                      name='gst'
                      value={gst}
                      onChange={handleChange}
                    />
                    {errors.gst && (
                      <FormHelperText error>{errors.gst}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
                {(discounts && discounts.length) ?
                  <Root sx={{ maxWidth: '100%', width: "100%" }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Discount Type</th>
                          <th>Discount Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {discounts && discounts.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.discountType}</td>
                              <td>{item.discountAmount}</td>
                              <td>
                                <Button onClick={() => handleDiscountEdit(item, index)}> Edit <ModeEditIcon /></Button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </Root>
                  : <></>
                }
                {/* Discount Filds */}
                <Grid container spacing={2}>
                  <Grid container spacing={2} m={2}>
                    <Grid item xs={1}>
                      <Button variant="contained" style={{ margin: "10px -42px -4px -17px" }} onClick={handleClickOpen}>Add Discount</Button>
                    </Grid>
                  </Grid>
                  <Dialog open={open} onClose={handleClose} xs={12}>
                    <DialogTitle >Discount</DialogTitle>
                    <DialogContent style={{ paddingTop: '10px' }}>
                      <FormControl xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <InputLabel required >Discount Type</InputLabel>
                            <Select
                              fullWidth
                              required
                              value={currentDiscount.discountType}
                              placeholder='select'
                              onChange={(e) => (setCurrentDiscount({ ...currentDiscount, discountType: e.target.value }), setCurrentDiscountError({ ...currentDiscountError, 'discountType': '' }))}
                            >
                              <MenuItem value="INAUGURAL_DISCOUNT">Inaugural Discount</MenuItem>
                              <MenuItem value="ON_FORM">On-Form Discount</MenuItem>
                            </Select>
                            {currentDiscountError.discountType && (
                              <FormHelperText error>{currentDiscountError.discountType}</FormHelperText>
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              required
                              label="Discount Amount"
                              type="number"
                              id="fullWidth outlined-error"
                              pattern="[0-9]"
                              value={currentDiscount.discountAmount}
                              onChange={(e) => (setCurrentDiscount({ ...currentDiscount, discountAmount: e.target.value }), setCurrentDiscountError({ ...currentDiscountError, 'discountAmount': '' }))}
                            />
                            {currentDiscountError.discountAmount && (
                              <FormHelperText error>{currentDiscountError.discountAmount}</FormHelperText>
                            )}
                          </Grid>
                        </Grid>
                      </FormControl>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleSave}>Add</Button>
                      <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                  </Dialog>
                </Grid>

                {/* Other Charge */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {(otherDiscounts && otherDiscounts.length) ?
                      <Root sx={{ maxWidth: '100%', width: "100%", marginBottom: "15px" }}>
                        <table>
                          <thead>
                            <tr>
                              <th>Charge Name</th>
                              <th>Charge Amount</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {otherDiscounts && otherDiscounts.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.otherChargeName}</td>
                                  <td>{item.otherChargeAmount}</td>
                                  <td>
                                    <Button onClick={() => handleOtherChargesEdit(item, index)}> Edit <ModeEditIcon /></Button>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </Root>
                      : <></>
                    }
                    <Button variant="contained" onClick={OtherCharges}>Add Other Charges</Button>
                  </Grid>
                  {/* <Grid item xs={9} >
                    {otherDiscounts && otherDiscounts.map((item, index) => {
                      return (
                        <TextField
                          disabled
                          key={index}
                          style={{ margin: "-20px -34px 19px", width: "116%" }}
                          value={`Charge Name - ${item.otherChargeName}, Charge Amount - ${item.otherChargeAmount}`}
                          fullWidth
                          label="Other Charges"
                          type="text"
                          id="fullWidth outlined-error"
                        />
                      )
                    })}
                  </Grid> */}
                  <Dialog open={otherPopUp} onClose={handleClose}>
                    <DialogTitle>Other Charges</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                        <Grid item xs={5} m={1}>
                          <FormControl fullWidth required>
                            <TextField
                              fullWidth
                              required
                              label="Other Charge Name"
                              type="text"
                              id="fullWidth outlined-error"
                              value={currentOtherDiscounts.otherChargeName}
                              onChange={(e) => (setCurrentOtherDiscounts({ ...currentOtherDiscounts, otherChargeName: e.target.value }, setCurrentOtherDiscountsError({ ...currentOtherDiscountsError, 'otherChargeName': '' })))}
                            />
                          </FormControl>
                          {currentOtherDiscountsError.otherChargeName && (
                            <FormHelperText error>{currentOtherDiscountsError.otherChargeName}</FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={5} m={1}>
                          <FormControl fullWidth required>
                            <TextField
                              fullWidth
                              required
                              label="Other Charge Amount"
                              type="number"
                              id="fullWidth outlined-error"
                              value={currentOtherDiscounts.otherChargeAmount}
                              onChange={(e) => (setCurrentOtherDiscounts({ ...currentOtherDiscounts, otherChargeAmount: e.target.value }), setCurrentOtherDiscountsError({ ...currentOtherDiscountsError, 'otherChargeAmount': '' }))}
                            />
                          </FormControl>
                          {currentOtherDiscountsError.otherChargeAmount && (
                            <FormHelperText error>{currentOtherDiscountsError.otherChargeAmount}</FormHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleSaveOther} autoFocus>Add</Button>
                      <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </AccordionDetails>
            </Accordion>
            {/* Payment Received  */}
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant='h5'>Payment Received</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid spacing={2}>
                  <Grid xs={12}>
                    {(paymentRecievedDetails && paymentRecievedDetails.length) ?
                      <Root sx={{ maxWidth: '100%', width: "100%", marginBottom: "15px" }}>
                        <table>
                          <thead>
                            <tr>
                              <th>Amount Received</th>
                              <th>Payment Method</th>
                              <th>Payment Status</th>
                              <th>Payment Date</th>
                              <th>Builder Reciept</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paymentRecievedDetails && paymentRecievedDetails.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.amountReceived}</td>
                                  <td>{item.paymentMode}</td>
                                  <td>{item.paymentStatus}</td>
                                  <td>{formatDate(item.date)}</td>
                                  <td>{item.receipt == true ? 'Yes' : 'No'}</td>
                                  <td>
                                    <Button onClick={() => handlePaymentDetailsEdit(item, index)}> Edit <ModeEditIcon /></Button>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </Root>
                      : <></>
                    }
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="contained" fullWidth style={{ margin: "4px", marginTop: '5px', marginLeft: '-1px' }} onClick={handlePaymentReceived}>Add</Button>
                    {errors.amountReceivedDetails && (
                      <FormHelperText error>{errors.amountReceivedDetails}</FormHelperText>
                    )}
                  </Grid>
                  {/* {paymentRecievedDetails && paymentRecievedDetails.map((item, index) => {
                    return (
                      <TextField disabled style={{ margin: '1px' }} fullWidth label="" key={index} type="text" id="fullWidth outlined-error"
                        value={item.amountReceived}
                      />
                    )
                  })} */}
                </Grid>
                <Dialog open={paymentReceived} onClose={handleClose}>
                  <DialogTitle>Payment Received</DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                      <Grid item xs={10} style={{ marginLeft: "70px", marginTop: "12px" }}>
                        <PaymentReceived currentPaymentRecievedDetails={currentPaymentRecievedDetails} setCurrentPaymentRecvedDetails={setCurrentPaymentRecvedDetails} setCurrentPaymentRecvedDetailsErros={setCurrentPaymentRecvedDetailsErros} currentPaymentRecievedDetailsErros={currentPaymentRecievedDetailsErros} />
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleSavePaymentDetails}>Add</Button>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>
              </AccordionDetails>
            </Accordion>
            {/* Retention Property  */}
            {bookingType === "RETENTION" && (
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant='h5'>Retention Property</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid spacing={2}>
                    <Grid xs={12}>
                      {(retentionPropertyDetails && retentionPropertyDetails.length) ?
                        <Root sx={{ maxWidth: '100%', width: "100%", marginBottom: "15px" }}>
                          <table>
                            <thead>
                              <tr>
                                <th>Builder Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              {retentionPropertyDetails && retentionPropertyDetails.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item.builder}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </Root>
                        : <></>
                      }
                    </Grid>
                    <Grid item xs={2}>
                      <Button variant="contained" style={{ margin: "10px", marginLeft: '-1px' }} onClick={handleRetentionProperty}>Add</Button>
                    </Grid>
                  </Grid><Dialog open={Retentionproperty} onClose={handleClose}>
                    <DialogTitle>Retention Property</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                        <Grid item xs={10} style={{ marginLeft: "70px", marginTop: "12px" }}>
                          <RetentionProperty currentRetentionDetails={currentRetentionDetails} setCurrentRetentionDetails={setCurrentRetentionDetails} currentRetentionDetailsErrors={currentRetentionDetailsErrors} setCurrentRetentionDetailsErrors={setCurrentRetentionDetailsErrors} />
                        </Grid>
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleSaveRetentionProperty}>Save</Button>
                      <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                  </Dialog>
                </AccordionDetails>
              </Accordion>
            )}
            {/* Agreement */}
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant='h5'>Agreement</Typography>
              </AccordionSummary>
              <AccordionDetails>

                {/* Welcome Letter  */}

                <Grid container spacing={2} columns={16}>
                  <Grid item xs={4}>
                    <Typography>Welcome Letter</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup row aria-label="radiogroup" value={welcomeLetter} onChange={handleChange} name='welcomeLetter'>
                      <FormControlLabel value="YES" control={<Radio />} label="Yes" />
                      <FormControlLabel value="NO" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>
                  {welcomeLetter === "YES" && (
                    <Grid item xs={8} style={{ marginTop: "10px" }}>
                      <TextField style={{ width: '100%' }} label="Welcome Date" type="date" name='welcomeLetterDate'
                        InputLabelProps={{ shrink: true, }} value={formatDate(welcomeLetterDate)}
                        onChange={handleChange} />
                    </Grid>
                  )}
                  {errors.welcomeLetter && (
                    <FormHelperText error>{errors.welcomeLetter}</FormHelperText>
                  )}
                </Grid>

                {/* BBA  */}

                <Grid container spacing={2} columns={16}>
                  <Grid item xs={4}>
                    <Typography>BBA</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup row aria-label="radiogroup" value={bba} name='bba' onChange={handleChange}>
                      <FormControlLabel value="YES" control={<Radio />} label="Yes" />
                      <FormControlLabel value="NO" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>
                  {bba === "YES" && (
                    <Grid item xs={8} style={{ marginTop: "10px" }}>
                      <TextField label="BBA Date" type="date" variant="outlined" style={{ width: '100%' }} name='bbaDate'
                        InputLabelProps={{ shrink: true, }} value={formatDate(bbaDate)}
                        onChange={handleChange} />
                      {errors.bbaDate && (
                        <FormHelperText error>{errors.bbaDate}</FormHelperText>
                      )}
                    </Grid>
                  )}
                  {errors.bba && (
                    <FormHelperText error>{errors.bba}</FormHelperText>
                  )}
                </Grid>
                {/* RC  */}

                <Grid container spacing={2} columns={16}>
                  <Grid item xs={4}>
                    <Typography>RC</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup row aria-label="radiogroup" name="rc" value={rc} onChange={handleChange}>
                      <FormControlLabel value="YES" control={<Radio />} label="Yes" />
                      <FormControlLabel value="NO" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>
                  {rc === "YES" && (
                    <Grid item xs={8} style={{ marginTop: "10px" }}>
                      <TextareaAutosize style={{ height: "38px", width: "101%" }} name='rcRemarks' color="success" placeholder={"Remarks"} minRows={6} value={rcRemarks}
                        onChange={handleChange} />
                    </Grid>
                  )}
                </Grid>
                {/* RA  */}
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={4}>
                    <Typography>RA</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup row aria-label="radiogroup" name="ra" value={ra} onChange={handleChange}>
                      <FormControlLabel value="YES" control={<Radio />} label="Yes" />
                      <FormControlLabel value="NO" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>
                  {ra === "YES" && (
                    <Grid item xs={8} style={{ marginTop: "10px" }}>
                      <TextareaAutosize style={{ height: "38px", width: "101%" }} name='raRemarks' color="success" placeholder={"Remarks"} minRows={6} value={raRemarks}
                        onChange={handleChange} />
                    </Grid>
                  )}
                  {errors.ra && (
                    <FormHelperText error>{errors.ra}</FormHelperText>
                  )}
                </Grid>
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={4}>
                    <Typography>Registry</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup row aria-label="radiogroup" name="registry" value={registry} onChange={handleChange}>
                      <FormControlLabel value="YES" control={<Radio />} label="Yes" />
                      <FormControlLabel value="NO" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>
                  {errors.registry && (
                    <FormHelperText error>{errors.registry}</FormHelperText>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
            {/* Refund Page  */}
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant='h5'>Refund</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    <TextField fullWidth label="Refund Amount" InputLabelProps={{ shrink: true, }} type="number" required id="fullWidth outlined-error" name='refundAmount'
                      value={refundAmount}
                      onChange={handleChange}
                    />
                    {errors.refundAmount && (
                      <FormHelperText error>{errors.refundAmount}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    <TextField style={{ width: "100%" }} label="Refund Date" type="date" name="refundDate" value={formatDate(refundDate)} onChange={handleChange} InputLabelProps={{ shrink: true, }} />
                    {errors.refundDate && (
                      <FormHelperText error>{errors.refundDate}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    <TextareaAutosize style={{ width: '203%' }} color="success" name='refundReason' placeholder={"Remarks"} value={refundReason} minRows={6} onChange={handleChange} />
                    {errors.refundReason && (
                      <FormHelperText error>{errors.refundReason}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            {/* Miscellenous */}
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant='h5'>Miscellaneous</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2} columns={16}>

                  {/* Incentive Status  */}
                  <Grid item xs={8}>
                    <FormControl fullWidth required>
                      <InputLabel>Incentive</InputLabel>
                      <Select
                        id="incentive_status"
                        name="incentive"
                        value={incentive}
                        onChange={handleChange}
                      >
                        <MenuItem value="na">NA</MenuItem>
                        <MenuItem value="bybuilder">By Builder</MenuItem>
                        <MenuItem value="bytruevisory">By Truevisory</MenuItem>
                      </Select>
                    </FormControl>
                    {errors.incentive && (
                      <FormHelperText error>{errors.incentive}</FormHelperText>
                    )}
                  </Grid>

                  {/* scheme  */}
                  <Grid item xs={8}>
                    <FormControl fullWidth required>
                      <InputLabel>Scheme</InputLabel>
                      <Select
                        id="scheme"
                        value={scheme}
                        name="scheme"
                        onChange={handleChange}
                      >
                        <MenuItem value="festiveOfferbyBuilder">Festive offer by Builder</MenuItem>
                        <MenuItem value="Festive offer by Truevisory">Festive offer by Truevisory</MenuItem>
                        <MenuItem value="Event offer by Builder">Event offer by Builder</MenuItem>
                        <MenuItem value="Event offer by Truevisory">Event offer by Truevisory</MenuItem>
                      </Select>
                    </FormControl>
                    {errors.scheme && (
                      <FormHelperText error>{errors.scheme}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth required>
                      <InputLabel>SIF Status</InputLabel>
                      <Select
                        id="incentive_status"
                        value={sifStatus}
                        name="sifStatus"
                        onChange={handleChange}
                      >
                        <MenuItem value="received">Received</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                      </Select>
                    </FormControl>
                    {errors.sifStatus && (
                      <FormHelperText error>{errors.sifStatus}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    <TextField required fullWidth id="sif_link" type="text" value={sifLink} name="sifLink"
                      onChange={handleChange}
                      label="SIF Link"
                    />
                    {errors.sifLink && (
                      <FormHelperText error>{errors.sifLink}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={8}>
                    <TextareaAutosize style={{ width: '203%' }} name="bookingRemarks" color="success" placeholder={"Remarks"} value={bookingRemarks} minRows={6} onChange={handleChange} />
                    {errors.bookingRemarks && (
                      <FormHelperText error>{errors.bookingRemarks}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Button fullWidth style={{ margin: "12px 0px 10px 0px" }} variant="contained" onClick={handleSubmit}>Submit</Button>
          </form>
        </Grid>
      </Grid>
      {Object.values(successMessage) && <Alert severity={successMessage.type}>{successMessage.message}</Alert>}
    </div >
  );
}

Booking.defaultProps = {
  title: "TrueVisory", // Ensure 'title' prop is a string
  // Other propTypes for your component
};
const Root = styled('div')(
  ({ theme }) => `
table {
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  border-collapse: collapse;
  width: 100%;
}
td,
th {
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  text-align: left;
  padding: 8px;
}
td,
th {
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
}
`,
);
const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};
