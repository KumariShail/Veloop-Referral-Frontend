const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem("token", data.token);

  return data;
}

export async function register(
  email,
  password,
  name,
  referralCode = ""
) {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        referralCode: referralCode || undefined,
        deviceToken:
          localStorage.getItem("deviceToken") || undefined,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Registration failed"
    );
  }

  if (data.deviceToken) {
    localStorage.setItem(
      "deviceToken",
      data.deviceToken
    );
  }

  return data;
}

export async function getMyReferralData() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/api/referrals/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch referral data");
  }

  const data = await response.json();

  console.log("REAL REFERRAL DATA:", data);

  return data;
}

export async function getReferralEligibility(referralId) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/api/rewards/${referralId}/eligibility`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch referral progress"
    );
  }

  return data;
}