const API_BASE_URL = "https://veloop-referral-backend.onrender.com";

export async function getMyReferralData() {
  const response = await fetch(
    `${API_BASE_URL}/api/referrals/me`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch referral data");
  }

  return response.json();
}