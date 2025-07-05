import React, { useState } from "react";

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: "₹0",
      yearlyPrice: "₹0",
      subtitle: "Perfect for getting started",
      description: "Essential features for small classrooms",
      features: [
        "Up to 20 students",
        "5 live classes per month",
        "Basic assignments",
        "Email support",
        "Mobile app access",
      ],
      notIncluded: ["Auto-grading", "Custom branding", "API access", "Priority support"],
      popular: false,
      cta: "Get Started Free",
    },
    {
      name: "Pro",
      price: "₹499",
      yearlyPrice: "₹4,490",
      subtitle: "Most popular for educators",
      description: "Advanced features for growing classrooms",
      features: [
        "Up to 100 students",
        "Unlimited live classes",
        "Assignment auto-grading",
        "Advanced analytics",
        "Priority support",
        "Custom themes",
        "Bulk student import",
      ],
      notIncluded: ["Custom branding", "API access", "Dedicated support"],
      popular: true,
      cta: "Start Pro Trial",
    },
    {
      name: "Enterprise",
      price: "Custom",
      yearlyPrice: "Custom",
      subtitle: "For institutions & organizations",
      description: "Everything you need at scale",
      features: [
        "Unlimited students",
        "Unlimited live classes",
        "Assignment auto-grading",
        "Custom branding",
        "API access",
        "Dedicated support",
        "SSO integration",
        "Custom integrations",
      ],
      notIncluded: [],
      popular: false,
      cta: "Contact Sales",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">Simple Pricing for Powerful Teaching</h1>
        <p className="text-gray-600 text-lg mb-6">No hidden fees. Choose the plan that fits your classroom.</p>
        <div className="flex justify-center items-center gap-4 mb-10">
          <span className={!isYearly ? "text-purple-700 font-semibold" : "text-gray-500"}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-12 h-6 bg-gray-300 rounded-full relative"
          >
            <div
              className={`h-5 w-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
                isYearly ? "left-6 -translate-x-full" : "left-1"
              }`}
            ></div>
          </button>
          <span className={isYearly ? "text-purple-700 font-semibold" : "text-gray-500"}>Yearly</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200 ${
              plan.popular ? "border-purple-600 scale-105" : "border-gray-200"
            }`}
          >
            {plan.popular && (
              <div className="text-xs text-white bg-purple-600 py-1 px-2 rounded-full inline-block mb-3">
                Most Popular
              </div>
            )}
            <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
            <p className="text-sm text-gray-500">{plan.subtitle}</p>
            <div className="mt-4">
              <span className="text-3xl font-semibold text-gray-900">
                {isYearly ? plan.yearlyPrice : plan.price}
              </span>
              {plan.price !== "Custom" && (
                <span className="text-sm text-gray-500"> / {isYearly ? "year" : "month"}</span>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-2">{plan.description}</p>

            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-center">
                  ✅ <span className="ml-2">{feat}</span>
                </li>
              ))}
              {plan.notIncluded.map((feat, i) => (
                <li key={i} className="flex items-center opacity-60">
                  ❌ <span className="ml-2">{feat}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-6 w-full py-2 px-4 text-sm font-medium rounded ${
                plan.name === "Enterprise"
                  ? "bg-gray-900 text-white"
                  : plan.popular
                  ? "bg-purple-600 text-white"
                  : "border border-purple-600 text-purple-600 hover:bg-purple-50"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
