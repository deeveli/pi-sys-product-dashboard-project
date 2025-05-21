import { useState } from 'react';

export const useModalControls = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewingProductId, setViewingProductId] = useState<number | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

  const handleEditClick = (productId: number) => {
    setEditingProductId(productId);
    setIsEditOpen(true);
    setIsViewOpen(false);
  };

  const handleViewClick = (productId: number) => {
    setViewingProductId(productId);
    setIsViewOpen(true);
  };

  const handleDeleteClick = (productId: number) => {
    setDeleteProductId(productId);
    setIsDeleteOpen(true);
    setIsViewOpen(false);
  };

  return {
    isEditOpen,
    setIsEditOpen,
    editingProductId,
    handleEditClick,
    isViewOpen,
    setIsViewOpen,
    viewingProductId,
    handleViewClick,
    isDeleteOpen,
    setIsDeleteOpen,
    deleteProductId,
    handleDeleteClick,
  };
};
