'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EventDetails {
  id: number;
  name: string;
  image: string;
  voucherCount: number;
}

interface Voucher {
  code: string;
  count: number;
  description: string;
  event: EventDetails;
  expirationDate: string;
  id: number;
  image: string;
  qrcode: string;
  status: string;
  value: number;
}

interface Token {
	accessToken: string;
  }

const Page = ({
  searchParams,
}: {
  searchParams: {
    voucherId: string;
  };
}) => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  // Fetch User ID from sessionStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUserId = sessionStorage.getItem('userId');
        if (!fetchedUserId) {
          throw new Error('User ID not found');
        }
        setUserId(parseInt(fetchedUserId));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

  // Fetch Vouchers for the user
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        // Assuming you have an API endpoint to fetch vouchers based on user ID
		const tokenString = sessionStorage.getItem('token');
        if (!tokenString) {
          throw new Error('Token not found');
        }
        const token: Token = JSON.parse(tokenString);
        const accessToken = token.accessToken;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/games/vouchers/user/${userId}`,{
			headers:{
				'Authorization': `Bearer ${accessToken}`
			}
		});
        const data = response.data;
		console.log(data);
        setVouchers(data);
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      }
    };

    if (userId) {
      fetchVouchers();
    }
  }, [userId]);

  const openVoucherModal = (selectedVoucher: Voucher) => {
    setVoucher(selectedVoucher);
    setIsVoucherModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Vouchers của bạn</h1>

      {/* List of Vouchers */}
      <div className="grid grid-cols-1 gap-4">
        {vouchers.length>0 && vouchers.map((v) => (
          <div
            key={v.id}
            className="flex items-center p-4 bg-white shadow-md rounded-md"
          >
            {/* Voucher Image */}
            <div className="w-1/4">
              <img
                src={v.image}
                alt={v.description}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Voucher Details */}
            <div className="w-3/4 pl-4">
              <div className="text-lg font-semibold">Code: {v.code}</div>
              <div className="text-sm">Value: {v?.value && new Intl.NumberFormat().format(v.value)}</div>
              <div className="text-sm">Quantity: {v.count}</div>

              <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={() => openVoucherModal(v)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Voucher Modal */}
      {isVoucherModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Voucher Details</h2>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsVoucherModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Voucher Details */}
            <div className="space-y-4">
              <div className="text-sm">
                <strong>Code:</strong> {voucher?.code}
              </div>
			  <div className="text-sm">
					<strong>Value:</strong> {voucher?.value && new Intl.NumberFormat().format(voucher.value)}
				</div>

              <div>
                <img
                  src={voucher?.qrcode}
                  alt="Voucher QR Code"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
