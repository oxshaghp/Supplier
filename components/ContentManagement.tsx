"use client";

import { useState, useEffect } from "react";

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("businesses");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [showEditBusiness, setShowEditBusiness] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<any>(null);

  const businessListings = [
    {
      id: 1,
      name: "Metro Electronics Supply",
      owner: "Ahmed Al-Rashid",
      status: "approved",
      category: "Electronics",
      createdDate: "2024-01-15",
      lastModified: "2024-01-20",
      reports: 0,
      views: 1247,
      crStatus: "verified",
      crUploadDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Tech Solutions Co.",
      owner: "Sarah Johnson",
      status: "pending_verification",
      category: "Technology",
      createdDate: "2024-01-18",
      lastModified: "2024-01-18",
      reports: 0,
      views: 89,
      crStatus: "under_review",
      crUploadDate: "2024-01-18",
    },
    {
      id: 3,
      name: "Digital Innovations",
      owner: "Michael Chen",
      status: "flagged",
      category: "Technology",
      createdDate: "2024-01-12",
      lastModified: "2024-01-19",
      reports: 3,
      views: 567,
      crStatus: "rejected",
      crUploadDate: "2024-01-12",
    },
    {
      id: 4,
      name: "Future Tech Solutions",
      owner: "Lisa Martinez",
      status: "pending_verification",
      category: "Technology",
      createdDate: "2024-01-20",
      lastModified: "2024-01-20",
      reports: 0,
      views: 12,
      crStatus: "pending_review",
      crUploadDate: "2024-01-20",
    },
  ];

  const documentVerifications = [
    {
      id: 1,
      businessName: "Tech Solutions Co.",
      ownerName: "Sarah Johnson",
      documentType: "Commercial Registration",
      uploadDate: "2024-01-18",
      status: "under_review",
      reviewer: "Admin Team",
      notes: "Document quality is good, verifying with authorities",
      crNumber: "CR-123456789",
      issueDate: "2023-06-15",
      expiryDate: "2025-06-15",
    },
    {
      id: 2,
      businessName: "Future Tech Solutions",
      ownerName: "Lisa Martinez",
      documentType: "Commercial Registration",
      uploadDate: "2024-01-20",
      status: "pending_review",
      reviewer: null,
      notes: null,
      crNumber: "CR-987654321",
      issueDate: "2023-08-10",
      expiryDate: "2025-08-10",
    },
  ];

  const reportedContent = [
    {
      id: 1,
      type: "business_description",
      business: "Digital Innovations",
      reportedBy: "Anonymous User",
      reason: "Inappropriate content",
      status: "pending",
      reportDate: "2024-01-19",
      content:
        "This business description contains misleading information about their services...",
    },
    {
      id: 2,
      type: "business_photo",
      business: "Quick Print Services",
      reportedBy: "John Doe",
      reason: "Copyright violation",
      status: "reviewing",
      reportDate: "2024-01-18",
      content:
        "Business photo appears to be copyrighted material from another company",
    },
  ];

  const pendingReviews = [
    {
      id: 1,
      businessName: "Metro Electronics Supply",
      businessId: "metro-electronics",
      customerName: "Anonymous User",
      rating: 5,
      reviewText:
        "Excellent service and fast delivery. The products were exactly as described and the staff was very helpful throughout the process.",
      submissionDate: "2024-01-22",
      status: "pending_approval",
      flagged: false,
    },
    {
      id: 2,
      businessName: "TechSolutions Co.",
      businessId: "tech-solutions-co",
      customerName: "Anonymous User",
      rating: 4,
      reviewText:
        "Good quality products and reasonable prices. The only issue was the delivery took a bit longer than expected.",
      submissionDate: "2024-01-21",
      status: "pending_approval",
      flagged: false,
    },
    {
      id: 3,
      businessName: "Digital Innovations",
      businessId: "digital-innovations",
      customerName: "Anonymous User",
      rating: 2,
      reviewText:
        "Poor customer service and the product quality was not as advertised. Would not recommend.",
      submissionDate: "2024-01-20",
      status: "pending_approval",
      flagged: true,
    },
  ];

  useEffect(() => {
    setBusinesses(businessListings);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "verified":
        return "bg-green-100 text-green-600";
      case "pending":
      case "pending_verification":
      case "pending_review":
        return "bg-yellow-100 text-yellow-600";
      case "flagged":
      case "rejected":
        return "bg-red-100 text-red-600";
      case "reviewing":
      case "under_review":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getCRStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return "ri-shield-check-line text-green-600";
      case "under_review":
        return "ri-search-line text-blue-600";
      case "pending_review":
        return "ri-time-line text-yellow-600";
      case "rejected":
        return "ri-close-circle-line text-red-600";
      default:
        return "ri-question-line text-gray-600";
    }
  };

  const handleBulkAction = (action: string) => {
    try {
      console.log(`${action} items:`, selectedItems);
    } catch (error) {
      console.error("Bulk action failed:", error);
    } finally {
      setSelectedItems([]);
    }
  };

  const handleContentAction = (
    action: string,
    itemId: number,
    itemType: string
  ) => {
    try {
      console.log(`${action} ${itemType} ${itemId}`);
    } catch (error) {
      console.error(
        `Action "${action}" failed for ${itemType} ${itemId}:`,
        error
      );
    }
  };

  const handleDocumentAction = (action: string, docId: number) => {
    try {
      console.log(`${action} document ${docId}`);
      // In real implementation, this would update the document status
    } catch (error) {
      console.error(`Document action "${action}" failed for ${docId}:`, error);
    }
  };

  const handleReviewAction = (action: string, reviewId: number) => {
    const review = pendingReviews.find((r) => r.id === reviewId);
    if (!review) return;

    try {
      switch (action) {
        case "approve":
          console.log(
            `Approving review ${reviewId} for ${review.businessName}`
          );
          // In real implementation:
          // 1. Update review status to 'approved'
          // 2. Add to business public profile
          // 3. Send notification to business owner
          alert(
            `Review approved! The business owner will be notified and the review will appear on their public profile.`
          );
          break;
        case "reject":
          console.log(`Rejecting review ${reviewId}`);
          alert(
            "Review has been rejected and will not appear on the business profile."
          );
          break;
        case "flag":
          console.log(`Flagging review ${reviewId} for further review`);
          alert("Review has been flagged for further investigation.");
          break;
      }
    } catch (error) {
      console.error(`Review action "${action}" failed:`, error);
    }
  };

  const filteredBusinesses = businesses.filter(
    (business) => filterStatus === "all" || business.status === filterStatus
  );

  const tabs = [
    { id: "businesses", name: "Business Listings", icon: "ri-store-line" },
    { id: "reviews", name: "Pending Reviews", icon: "ri-star-line" },
    {
      id: "verification",
      name: "Document Verification",
      icon: "ri-shield-check-line",
    },
    { id: "reports", name: "Reported Content", icon: "ri-flag-line" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Content Management</h2>
        <div className="flex space-x-3">
          {selectedItems.length > 0 && (
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction("approve")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-medium text-sm whitespace-nowrap cursor-pointer"
              >
                <i className="ri-check-line mr-2"></i>
                Approve ({selectedItems.length})
              </button>
              <button
                onClick={() => handleBulkAction("reject")}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-medium text-sm whitespace-nowrap cursor-pointer"
              >
                <i className="ri-close-line mr-2"></i>
                Reject ({selectedItems.length})
              </button>
            </div>
          )}
          <button
            onClick={() => {
              const headers = [
                "ID",
                "Name",
                "Owner",
                "Status",
                "Category",
                "Created Date",
                "Last Modified",
                "Reports",
                "Views",
                "CR Status",
                "CR Upload Date",
              ];
              const rows = businesses.map((b) => [
                b.id,
                `"${b.name}"`,
                `"${b.owner}"`,
                b.status,
                b.category,
                b.createdDate,
                b.lastModified,
                b.reports,
                b.views,
                b.crStatus,
                b.crUploadDate,
              ]);
              const csv = [
                "\ufeff" + headers.join(","),
                ...rows.map((r) => r.join(",")),
              ].join("\n");
              const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "businesses.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-medium text-sm whitespace-nowrap cursor-pointer"
          >
            <i className="ri-download-line mr-2"></i>
            Export Report
          </button>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-store-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {businessListings.length}
              </h3>
              <p className="text-gray-600 text-sm">Total Businesses</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-star-line text-orange-600 text-xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {pendingReviews.length}
              </h3>
              <p className="text-gray-600 text-sm">Pending Reviews</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-shield-check-line text-yellow-600 text-xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {documentVerifications.length}
              </h3>
              <p className="text-gray-600 text-sm">Doc Verification</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-flag-line text-red-600 text-xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {reportedContent.length}
              </h3>
              <p className="text-gray-600 text-sm">Reported Content</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-green-600 text-xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {businessListings.filter((b) => b.status === "approved").length}
              </h3>
              <p className="text-gray-600 text-sm">Approved Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-6 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === tab.id
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.name}
                {tab.id === "reviews" && pendingReviews.length > 0 && (
                  <span className="ml-2 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                    {pendingReviews.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Business Listings Tab */}
          {activeTab === "businesses" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm pr-8"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending_verification">
                    Pending Verification
                  </option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems(
                                filteredBusinesses.map((b) => b.id)
                              );
                            } else {
                              setSelectedItems([]);
                            }
                          }}
                          checked={
                            selectedItems.length ===
                              filteredBusinesses.length &&
                            filteredBusinesses.length > 0
                          }
                        />
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                        Business
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                        Owner
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                        Category
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                        CR Status
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                        Views
                      </th>
                      <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBusinesses.map((business) => (
                      <tr key={business.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(business.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedItems([
                                  ...selectedItems,
                                  business.id,
                                ]);
                              } else {
                                setSelectedItems(
                                  selectedItems.filter(
                                    (id) => id !== business.id
                                  )
                                );
                              }
                            }}
                            className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-medium text-gray-800">
                            {business.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Created:{" "}
                            {new Date(
                              business.createdDate
                            ).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-gray-800">{business.owner}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                            {business.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                              business.status
                            )}`}
                          >
                            {business.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <i
                              className={getCRStatusIcon(business.crStatus)}
                            ></i>
                            <span
                              className={`text-xs font-medium capitalize ${getStatusColor(
                                business.crStatus
                              )}`}
                            >
                              {business.crStatus.replace("_", " ")}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-gray-800">
                            {business.views}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-blue-600 hover:text-blue-700 cursor-pointer"
                              title="View Details"
                            >
                              <i className="ri-eye-line"></i>
                            </button>
                            <button
                              onClick={() => {
                                setEditingBusiness(business);
                                setShowEditBusiness(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-700 cursor-pointer"
                              title="Edit"
                            >
                              <i className="ri-edit-line"></i>
                            </button>
                            <button
                              onClick={() => {
                                setBusinesses((prev) =>
                                  prev.map((b) =>
                                    b.id === business.id
                                      ? { ...b, status: "approved" }
                                      : b
                                  )
                                );
                              }}
                              className="text-green-600 hover:text-green-700 cursor-pointer"
                              title="Approve"
                            >
                              <i className="ri-check-line"></i>
                            </button>
                            <button
                              onClick={() => {
                                setBusinesses((prev) =>
                                  prev.map((b) =>
                                    b.id === business.id
                                      ? { ...b, status: "flagged" }
                                      : b
                                  )
                                );
                              }}
                              className="text-yellow-600 hover:text-yellow-700 cursor-pointer"
                              title="Flag"
                            >
                              <i className="ri-flag-line"></i>
                            </button>
                            <button
                              onClick={() => {
                                if (!confirm("Delete this business?")) return;
                                setBusinesses((prev) =>
                                  prev.filter((b) => b.id !== business.id)
                                );
                                setSelectedItems((prev) =>
                                  prev.filter((id) => id !== business.id)
                                );
                              }}
                              className="text-red-600 hover:text-red-700 cursor-pointer"
                              title="Delete"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pending Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Review Approval Queue
                  </h3>
                  <p className="text-sm text-gray-600">
                    Reviews awaiting admin approval before appearing on business
                    profiles
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {pendingReviews.filter((r) => r.flagged).length} flagged for
                    review
                  </span>
                </div>
              </div>

              {pendingReviews.map((review) => (
                <div
                  key={review.id}
                  className={`border rounded-lg p-6 ${
                    review.flagged
                      ? "border-red-200 bg-red-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <i className="ri-star-line text-orange-600 text-xl"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {review.businessName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Submitted by: {review.customerName}
                          </p>
                        </div>
                        {review.flagged && (
                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
                            <i className="ri-flag-line mr-1"></i>
                            Flagged
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="font-medium text-gray-700">
                            Rating:
                          </span>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex text-yellow-400">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                  key={star}
                                  className={`${
                                    star <= review.rating
                                      ? "ri-star-fill"
                                      : "ri-star-line text-gray-300"
                                  }`}
                                ></i>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              ({review.rating}/5)
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Submission Date:
                          </span>
                          <p className="text-gray-600">
                            {new Date(
                              review.submissionDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Status:
                          </span>
                          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs ml-2">
                            {review.status.replace("_", " ")}
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <span className="font-medium text-gray-700">
                          Review Content:
                        </span>
                        <p className="text-gray-700 mt-2 leading-relaxed">
                          {review.reviewText}
                        </p>
                      </div>

                      {review.flagged && (
                        <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-4">
                          <div className="flex items-center space-x-2">
                            <i className="ri-alert-line text-red-600"></i>
                            <span className="font-medium text-red-800">
                              Review Flagged
                            </span>
                          </div>
                          <p className="text-sm text-red-700 mt-1">
                            This review has been flagged for potential policy
                            violations. Please review carefully before approval.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <button
                        onClick={() => setSelectedReview(review)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-eye-line mr-2"></i>
                        View Details
                      </button>
                      <button
                        onClick={() => handleReviewAction("approve", review.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-check-line mr-2"></i>
                        Approve
                      </button>
                      <button
                        onClick={() => handleReviewAction("reject", review.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-close-line mr-2"></i>
                        Reject
                      </button>
                      {!review.flagged && (
                        <button
                          onClick={() => handleReviewAction("flag", review.id)}
                          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-flag-line mr-2"></i>
                          Flag
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {pendingReviews.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <i className="ri-star-line text-4xl mb-4"></i>
                  <p>No reviews pending approval</p>
                </div>
              )}
            </div>
          )}

          {/* Document Verification Tab */}
          {activeTab === "verification" && (
            <div className="space-y-6">
              {documentVerifications.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <i className="ri-file-shield-line text-yellow-600 text-xl"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {doc.businessName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Owner: {doc.ownerName}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            doc.status
                          )}`}
                        >
                          {doc.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="font-medium text-gray-700">
                            Document Type:
                          </span>
                          <p className="text-gray-600">{doc.documentType}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            CR Number:
                          </span>
                          <p className="text-gray-600">{doc.crNumber}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Upload Date:
                          </span>
                          <p className="text-gray-600">
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Issue Date:
                          </span>
                          <p className="text-gray-600">
                            {new Date(doc.issueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Expiry Date:
                          </span>
                          <p className="text-gray-600">
                            {new Date(doc.expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Reviewer:
                          </span>
                          <p className="text-gray-600">
                            {doc.reviewer || "Not assigned"}
                          </p>
                        </div>
                      </div>

                      {doc.notes && (
                        <div className="bg-white p-3 rounded border border-yellow-200 mb-4">
                          <span className="font-medium text-gray-700">
                            Review Notes:
                          </span>
                          <p className="text-gray-600 mt-1">{doc.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={() => handleDocumentAction("view", doc.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-eye-line mr-2"></i>
                        View Document
                      </button>
                      <button
                        onClick={() => handleDocumentAction("approve", doc.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-check-line mr-2"></i>
                        Approve
                      </button>
                      <button
                        onClick={() => handleDocumentAction("reject", doc.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-close-line mr-2"></i>
                        Reject
                      </button>
                      <button
                        onClick={() =>
                          handleDocumentAction("request_resubmit", doc.id)
                        }
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-refresh-line mr-2"></i>
                        Request Resubmit
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {documentVerifications.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <i className="ri-file-check-line text-4xl mb-4"></i>
                  <p>No documents pending verification</p>
                </div>
              )}
            </div>
          )}

          {/* Reported Content Tab */}
          {activeTab === "reports" && (
            <div className="space-y-4">
              {reportedContent.map((report) => (
                <div
                  key={report.id}
                  className="bg-red-50 border border-red-200 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {report.business}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Type:</span>{" "}
                          {report.type.replace("_", " ")}
                        </div>
                        <div>
                          <span className="font-medium">Reported by:</span>{" "}
                          {report.reportedBy}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(report.reportDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="font-medium text-gray-700">
                          Reason:
                        </span>{" "}
                        {report.reason}
                      </div>
                      <div className="bg-white p-3 rounded border border-red-200">
                        <span className="font-medium text-gray-700">
                          Content:
                        </span>
                        <p className="text-gray-600 mt-1">{report.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() =>
                          handleContentAction("approve", report.id, "report")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleContentAction("takedown", report.id, "report")
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm cursor-pointer"
                      >
                        Take Down
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <i className="ri-star-line text-orange-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Review Details
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedReview.businessName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Business
                  </label>
                  <p className="text-gray-800">{selectedReview.businessName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Submitted By
                  </label>
                  <p className="text-gray-800">{selectedReview.customerName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`${
                            star <= selectedReview.rating
                              ? "ri-star-fill"
                              : "ri-star-line text-gray-300"
                          }`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({selectedReview.rating}/5)
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Submission Date
                  </label>
                  <p className="text-gray-800">
                    {new Date(
                      selectedReview.submissionDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Review Content
                </label>
                <div className="bg-gray-50 p-4 rounded-lg mt-2">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedReview.reviewText}
                  </p>
                </div>
              </div>

              {selectedReview.flagged && (
                <div className="bg-red-100 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="ri-alert-line text-red-600"></i>
                    <span className="font-medium text-red-800">
                      Flagged Review
                    </span>
                  </div>
                  <p className="text-sm text-red-700">
                    This review has been flagged for potential policy
                    violations. Consider the following before approval:
                  </p>
                  <ul className="text-sm text-red-700 mt-2 list-disc list-inside">
                    <li>Check for inappropriate language</li>
                    <li>Verify authenticity of the review</li>
                    <li>Ensure compliance with community guidelines</li>
                  </ul>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">
                  Approval Process
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • Approved reviews will appear on the business public
                    profile
                  </li>
                  <li>• Business owner will receive an email notification</li>
                  <li>• Review will contribute to overall business rating</li>
                  <li>• Action is permanent and cannot be easily undone</li>
                </ul>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedReview(null)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleReviewAction("reject", selectedReview.id);
                    setSelectedReview(null);
                  }}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium cursor-pointer"
                >
                  <i className="ri-close-line mr-2"></i>
                  Reject Review
                </button>
                <button
                  onClick={() => {
                    handleReviewAction("approve", selectedReview.id);
                    setSelectedReview(null);
                  }}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium cursor-pointer"
                >
                  <i className="ri-check-line mr-2"></i>
                  Approve Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Business Modal */}
      {showEditBusiness && editingBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Edit Business
              </h3>
              <button
                onClick={() => setShowEditBusiness(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editingBusiness.name}
                  onChange={(e) =>
                    setEditingBusiness({
                      ...editingBusiness,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner
                </label>
                <input
                  type="text"
                  value={editingBusiness.owner}
                  onChange={(e) =>
                    setEditingBusiness({
                      ...editingBusiness,
                      owner: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingBusiness.category}
                    onChange={(e) =>
                      setEditingBusiness({
                        ...editingBusiness,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={editingBusiness.status}
                    onChange={(e) =>
                      setEditingBusiness({
                        ...editingBusiness,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  >
                    <option value="approved">Approved</option>
                    <option value="pending_verification">
                      Pending Verification
                    </option>
                    <option value="flagged">Flagged</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CR Status
                  </label>
                  <select
                    value={editingBusiness.crStatus}
                    onChange={(e) =>
                      setEditingBusiness({
                        ...editingBusiness,
                        crStatus: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  >
                    <option value="verified">Verified</option>
                    <option value="under_review">Under Review</option>
                    <option value="pending_review">Pending Review</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Views
                  </label>
                  <input
                    type="number"
                    value={editingBusiness.views}
                    onChange={(e) =>
                      setEditingBusiness({
                        ...editingBusiness,
                        views: parseInt(e.target.value || "0", 10),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditBusiness(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setBusinesses((prev) =>
                    prev.map((b) =>
                      b.id === editingBusiness.id
                        ? { ...b, ...editingBusiness }
                        : b
                    )
                  );
                  setShowEditBusiness(false);
                }}
                className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium text-sm cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
