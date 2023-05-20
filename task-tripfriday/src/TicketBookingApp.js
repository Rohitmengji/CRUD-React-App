import React, { useState } from "react";

const TicketBookingApp = () => {
  const packages = [
    { name: "Package 1", price: 700 },
    { name: "Package 2", price: 1200 },
    { name: "Package 3", price: 2400 },
  ];

  const [selectedPackage, setSelectedPackage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [numTickets, setNumTickets] = useState(0);

    console.log(totalPrice);
    console.log(numTickets);
  const handlePackageSelect = (event) => {
    const selectedPackage = event.target.value;
    const price =
      packages.find((pkg) => pkg.name === selectedPackage)?.price || 0;
    setSelectedPackage(selectedPackage);
    setTotalPrice(price * numTickets);
  };

  const handleNumTicketsChange = (event) => {
    const numTickets = parseInt(event.target.value);
    setNumTickets(numTickets);
    setTotalPrice(
      numTickets *
        packages.find((pkg) => pkg.name === selectedPackage)?.price || 0
    );
  };

  const handlePayment = () => {
    // Implement your payment integration logic here
    // This is just a placeholder
    alert("Payment Successful!");
  };

  return (
    <div>
      <h2 className="mt-3 mb-3">Ticket Booking App</h2>
      <div>
        <label>Select Package:</label>
        <select value={selectedPackage} onChange={handlePackageSelect}>
          <option value=''>Select a package</option>
          {packages.map((pkg, index) => (
            <option key={index} value={pkg.name}>
              {pkg.name} - ${pkg.price}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Number of Tickets:</label>
        <input
          type='number'
          min='0'
          max='7'
          value={numTickets}
          onChange={handleNumTicketsChange}
        />
      </div>
      <div>
        <label>Total Price:</label>
        <span>₹{totalPrice}</span>
      </div>
          <button
              className="btn btn-primary mt-2"
        disabled={!selectedPackage || numTickets === 0}
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
};

export default TicketBookingApp;
