import { Button, Space } from "antd";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import VendorCreateForm from "./VendorCreateForm";

function VenderHeader() {
  const [vendorFormModel, setVendorFormModel] = useState(false);

  return (
    <div className="flex  p-6 rounded-md justify-between">
      <h3 className="font-bold text-2xl">Vendors</h3>
      <div>
        <Space>
          <Button onClick={() => setVendorFormModel(!vendorFormModel)}>
            Create New Vendor
          </Button>
        </Space>

        <VendorCreateForm
          vendorFormModel={vendorFormModel}
          setVendorFormModel={setVendorFormModel}
        />
      </div>
    </div>
  );
}

export default VenderHeader;
