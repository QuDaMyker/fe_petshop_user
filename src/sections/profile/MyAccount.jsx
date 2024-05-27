import { Box, Button, ButtonGroup, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Input, List, ListItem, ListItemText, TextField } from "@mui/material";
import userApi from "../../apis/modules/user.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema } from "../../configs/zod.config";

const MyAccount = (props) => {
  const { value, index,...other } = props;
  const [user, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    username:'',
    firstname: '',
    lastname: '',
    phonenumber: ''
  });
  const [errors, setErrors] = useState({});
const [touchedFields, setTouchedFields] = useState({});
  // const {
  //   register,
  //   formState: { errors, touchedFields },
  // } = useForm({ resolver: zodResolver(UpdateUserSchema) });
  //const { register, handleSubmit, formState: { errors, touchedFields } } = useForm({ resolver: zodResolver(UpdateUserSchema) });

  const getInfo = async () => {
    setIsLoading(true);
    try {
      const { response, err } = await userApi.getInfo();
      if (response) {
        setUserInfo(response);
        setDialogData({
          username:response.username,
          firstname: response.firstName,
          lastname: response.lastName,
          phonenumber: response.phoneNumber
        });
      }
      console.log(response);
      if (err) {
        toast.error(err);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const updateUser = async (data) => {
    try {
      console.log("data",data)
      setIsLoading(true);
      const { response, err } = await userApi.updateUser(
        { UserName:data.username,
          FirstName:data.firstname,
          LastName:data.lastname,
          PhoneNumber:data.phonenumber}
      ); // Gọi API cập nhật thông tin người dùng
      if (response) {
        toast.success("Cập nhật thông tin người dùng thành công!");
        getInfo();
        //setUserInfo(response);
      }
      if (err) {
        toast.error(err.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi cập nhật thông tin người dùng!");
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenDialog = () => {
    setDialogData({
      username: user?.username || '',
      firstname: user?.firstName || '',
      lastname: user?.lastName || '',
      phonenumber: user?.phoneNumber || ''
    });
    setErrors({});
    setTouchedFields({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9\d)\d{7}$/;
    return phoneRegex.test(phoneNumber);
  };
  
  const handleUpdateUser = () => {
    const updatedErrors = {};
  let hasError = false;
  // Kiểm tra mỗi trường và xác thực dữ liệu
  if (!dialogData.username.trim()) {
    updatedErrors.username = "Vui lòng nhập tên người dùng";
    hasError = true;
  }
  if (!dialogData.firstname.trim()) {
    updatedErrors.firstname = "Vui lòng nhập họ";
    hasError = true;
  }
  if (!dialogData.lastname.trim()) {
    updatedErrors.lastname = "Vui lòng nhập tên";
    hasError = true;
  }
  const phoneNumber = dialogData.phonenumber.trim();
  if (!phoneNumber) {
    updatedErrors.phonenumber = "Vui lòng nhập số điện thoại";
    hasError = true;
  } else if (!isValidPhoneNumber(phoneNumber)) {
    updatedErrors.phonenumber = "Số điện thoại không hợp lệ";
    hasError = true;
  }

  // Nếu có lỗi, cập nhật state và ngăn chặn quá trình cập nhật
  if (hasError) {
    setErrors(updatedErrors);
    return;
  }
      updateUser(dialogData);
      handleCloseDialog();
    
  };
  useEffect(() => {
    getInfo();
  }, []);
  const handleDialogInputChange = (e) => {
    setDialogData({
      ...dialogData,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  return (
    <div 
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <List>
        <ListItem >
          <ListItemText primary="Username" sx={{
            flex:"0.2 !important"
          }} />
          <Input value={user?.username} sx={{ width:"400px !important" }}/>
        </ListItem>
        <ListItem >
          <ListItemText primary="Họ" sx={{
            flex:"0.2 !important"
          }} />
          <Input value={user?.firstName} sx={{ width:"400px !important" }}/>
        </ListItem>
        <ListItem >
          <ListItemText primary="Tên" sx={{
            flex:"0.2 !important"
          }} />
          <Input value={user?.lastName} sx={{ width:"400px !important" }}/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" sx={{
            flex:"0.2 !important"
          }} />
          <Input disabled sx={{ width:"400px !important" }}
            value={user?.email}
          />
        </ListItem>
        <ListItem >
          <ListItemText primary="Số điện thoại" sx={{
            flex:"0.2 !important"
          }} />
          <Input sx={{ width:"400px !important" }}
            value={user?.phoneNumber}
          />
        </ListItem>
        <ListItem >
          <ListItemText primary="Ngày tạo tài khoản" sx={{
            flex:"0.2 !important"
          }} />
          <Input sx={{ width:"400px !important" }} disabled
            value={
        user?.createdAt
        ? new Date(user.createdAt).toISOString().replace("T", " ").replace(/\.\d{3}Z/, "")
        : ""
}
          />
        </ListItem>
      </List>
      <ButtonGroup sx={{ marginTop: 4 }}>
        <Button variant="contained" onClick={handleOpenDialog} disabled={isLoading}>Cập nhật</Button>
      </ButtonGroup>
      
      <Dialog open={openDialog} onClose={handleCloseDialog} >
        <DialogTitle>Cập Nhật Thông Tin Người Dùng</DialogTitle>
        <Box sx={{ height: 10 }} />
        <DialogContent >
        <TextField
          // {
          // ...register("username")
          // }
            name="username"
            fullWidth
            label="Username"
            value={dialogData?.username}
            onChange={handleDialogInputChange}
            error={errors.username && touchedFields.username}
  helperText={errors.username}
  onBlur={() => setTouchedFields({ ...touchedFields, username: true })}
          />
          <Box sx={{ height: 20 }} />
          <TextField
            // {
            //   ...register("firstname")
            //   }
            name="firstname"
            fullWidth
            label="Họ"
            value={dialogData?.firstname}
            onChange={handleDialogInputChange}
            error={errors.firstname && touchedFields.firstname}
            helperText={errors.firstname}
            onBlur={() => setTouchedFields({ ...touchedFields, firstname: true })}
          />
          <Box sx={{ height: 20 }} />
          <TextField
          // {
          //   ...register("lastname")
          //   }
          name="lastname"
            fullWidth
            label="Tên"
            value={dialogData?.lastname}
            onChange={handleDialogInputChange}
            error={errors.lastname && touchedFields.lastname}
            helperText={errors.lastname}
            onBlur={() => setTouchedFields({ ...touchedFields, lastname: true })}
          />
          <Box sx={{ height: 20 }} />
          <TextField
          // {
          //   ...register("phonenumber")
          //   }
          name="phonenumber"
            fullWidth
            label="Số Điện Thoại"
            value={dialogData?.phonenumber}
            onChange={handleDialogInputChange}
            error={errors.phonenumber && touchedFields.phonenumber}
            helperText={errors.phonenumber}
            onBlur={() => setTouchedFields({ ...touchedFields, phonenumber: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleCloseDialog}>Hủy</Button>
          <Button type="submit" onClick={handleUpdateUser} color="primary">Cập Nhật</Button>

        </DialogActions>
      </Dialog>

    </div>
  );
};

export default MyAccount;
