import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function DeleteProductPage() {
  const [productInfo, setProductInfo] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  const goBackHandler = () => {
    router.push("/products");
  };
  const deleteProductHandler = async () => {
    await axios.delete("/api/products?id=" + id);
    goBackHandler();
  };
  return (
    <Layout>
      <h1 className='text-center'>
        Do you really want to delete &nbsp;"{productInfo?.title}"?
      </h1>
      <div className='flex gap-2 justify-center'>
        <button className='btn-red' onClick={deleteProductHandler}>
          Yes
        </button>
        <button className='btn-default' onClick={goBackHandler}>
          No
        </button>
      </div>
    </Layout>
  );
}

export default DeleteProductPage;
