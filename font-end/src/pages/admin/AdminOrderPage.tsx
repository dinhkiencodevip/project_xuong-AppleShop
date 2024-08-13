import React from "react";
import AdminLayout from "./layouts/AdminLayout";
import AdminOrderLayout from "./layouts/OrderAdminLayout";

const AdminOrderPage = () => {
  return (
    <AdminLayout>
      <AdminOrderLayout></AdminOrderLayout>
    </AdminLayout>
  );
};

export default AdminOrderPage;
