import React, { useEffect, useState } from 'react';
import { IProduct } from '../interfaces/Product';

import { Button, Table ,Modal,message} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

interface Props {
  product: IProduct;
  onDeleteClick: (productId: string) => void;
  onEditClick: (productId: string) => void; 
}

const ProductItem: React.FC<Props> = ({ product, onDeleteClick,onEditClick }) => {

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem('users') || '{}');
  const handleEdit = () => {
    onEditClick(product._id); 
  };

 

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalVisible(false);
    onDeleteClick(product._id);
    message.success('Product deleted successfully!');
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },

    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 150,
      render: (image: string) => (
        <img src={image} alt={product.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: () => (
        <div>
          <Button type="primary" danger onClick={handleDelete}>
            Delete
          </Button>
          <Link to={`/admin/products/update/${product._id}`}>
            <Button type="primary" style={{ marginLeft: '8px' }}>
              Edit
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const dataSource = [
    {
      key: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
     
      image: product.image, // Assuming the 'image' property contains the image URL
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ x: true }} />
      <Modal
        title="Confirm Deletion"
        visible={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </>
  );
};

export default ProductItem;
