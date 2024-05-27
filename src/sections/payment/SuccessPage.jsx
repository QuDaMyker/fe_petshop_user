import { Link, Button, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";
import { toast } from "react-toastify";
import emailApi from "../../apis/modules/email.api";

function SuccessPage() {
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const { shipInfo, totalAmount,cartItems } = useSelector(state => state.cart);
  // let body = `Đơn hàng của quý khách bao gồm:\n`;
  // cartItems.forEach(item => {
  //   body += `${item.Name}: ${item.Quantity} x ${item.Price}\n`;
  // });
  // body+=`\nTổng giá trị đơn hàng: ${totalAmount}`;
  useEffect(() => {
    handleClearCart();
    const send = async () => {
      const data = {
        to:shipInfo?.email,
        subject:"Cảm ơn quý khách đã lựa chọn chúng tôi",
        body: `Đơn hàng của quý khách bao gồm:\n${cartItems
          .map((item) => `${item.Name}: ${item.Quantity} x ${item.Price}`)
          .join("\n")}\n\nTổng giá trị đơn hàng: ${totalAmount}`
      };
      try {
        const { response, err } = await emailApi.checkoutEmail(data);
        if (err) {
          console.log(err);
          return;
        }
        if (response.status === 200) {
          toast.success(response.data);
          return;
        }
      } catch (error) {
        toast.error(error);
        return;
      }
    };
    send();
  }, []);

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <img src={`/assets/images/cod.svg`} alt="" width={120} height={120}/>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ mb: "12px" }}>
            Cảm ơn Quý khách {shipInfo?.firstName} đã mua hàng trên PetShop!
          </Typography>
          <Typography sx={{ width: { md: "85%", lg: "80%", xl: "65%" }, mx: "auto", mb: "12px", px: "12px" }}>
            Thời gian giao hàng dự kiến từ 2 - 5 ngày (có thể kéo dài hơn nếu bị ảnh hưởng bởi những tình huống bất khả
            kháng: thiên tai, bão lũ...). PetShop sẽ liên lạc với quý khách để xác nhận đơn và thông báo cụ thể.
          </Typography>
          <Typography>Rất mong quý khách hàng thông cảm!</Typography>
          <Typography sx={{ width: { md: "85%", lg: "80%", xl: "65%" }, mx: "auto", mb: "12px", px: "12px" }}>
            Để xem lại thông tin đơn hàng, quý khách vui lòng kiểm tra xác nhận đơn hàng đã được gửi qua email{" "}
            <strong>{shipInfo?.email}</strong>
          </Typography>
          <Typography sx={{ width: { md: "85%", lg: "80%", xl: "65%" }, mx: "auto", mb: "12px", px: "12px" }}>
            Trong trường hợp Quý khách không phải là Người trực tiếp nhận hàng. Quý khách vui lòng thông báo cho Người
            nhận luôn bật điện thoại để nhận liên lạc từ nhân viên giao hàng của PetShop
          </Typography>
          <Link href="/">
            <Button variant="contained">Trở về trang chủ</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default SuccessPage;