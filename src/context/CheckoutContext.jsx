import { createContext, useState } from 'react';

export const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.address) errors.address = 'Address is required';
    // Add more validations as needed
    return errors;
  };

  const submitCheckout = (cartSummary) => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Simulate order processing
    setOrderSummary({
      ...formData,
      ...cartSummary,
      date: new Date().toISOString()
    });
    setIsModalOpen(true);
  };

  return (
    <CheckoutContext.Provider value={{ 
      formData, 
      setFormData,
      errors,
      isModalOpen,
      setIsModalOpen,
      orderSummary,
      submitCheckout 
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

// export const useCheckout = () => useContext(CheckoutContext);