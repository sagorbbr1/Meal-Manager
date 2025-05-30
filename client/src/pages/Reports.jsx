import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";

const reports = [
  {
    id: 1,
    title: "Monthly Expense",
    amount: 3200,
    date: "2025-04-30",
    description: "Expense summary for April 2025",
  },
  {
    id: 2,
    title: "Member Activity",
    amount: null,
    date: "2025-04-28",
    description: "Report on active members in April",
  },
  {
    id: 3,
    title: "Meal Count",
    amount: null,
    date: "2025-04-30",
    description: "Total meals served in April",
  },
];

const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "-";
  return `৳${amount.toLocaleString()}`;
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    color: "#047857",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#D1FAE5",
    padding: 4,
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
  },
  tableColDesc: {
    width: "40%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
  },
  tableCellHeader: {
    fontWeight: "bold",
    color: "#065F46",
  },
  tableCell: {
    color: "#374151",
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Reports</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableColHeader, styles.tableCellHeader]}>#</Text>
          <Text style={[styles.tableColHeader, styles.tableCellHeader]}>
            Title
          </Text>
          <Text style={[styles.tableColHeader, styles.tableCellHeader]}>
            Amount
          </Text>
          <Text style={[styles.tableColHeader, styles.tableCellHeader]}>
            Date
          </Text>
          <Text
            style={[
              styles.tableColHeader,
              styles.tableCellHeader,
              { width: "40%" },
            ]}
          >
            Description
          </Text>
        </View>
        {reports.map((report, idx) => (
          <View key={report.id} style={styles.tableRow}>
            <Text style={[styles.tableCol, styles.tableCell]}>{idx + 1}</Text>
            <Text style={[styles.tableCol, styles.tableCell]}>
              {report.title}
            </Text>
            <Text style={[styles.tableCol, styles.tableCell]}>
              {formatCurrency(report.amount)}
            </Text>
            <Text style={[styles.tableCol, styles.tableCell]}>
              {formatDate(report.date)}
            </Text>
            <Text style={[styles.tableColDesc, styles.tableCell]}>
              {report.description}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const Reports = () => {
  return (
    <div className="flex flex-col sm:flex-row h-screen bg-emerald-50 overflow-hidden">
      <Sidebar className="hidden sm:block" />

      <div className="flex-1 flex flex-col overflow-auto">
        <HeaderNav />
        <main className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-emerald-700 mb-1">
                Reports
              </h1>
              <p className="text-gray-600">Here’s a list of your reports.</p>
            </div>

            <PDFDownloadLink
              document={<MyDocument />}
              fileName="meal-manager-report.pdf"
              className="inline-block w-full sm:w-auto text-center px-4 py-2 mt-5  bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition font-semibold"
            >
              {({ loading }) =>
                loading ? "Generating PDF..." : "Download PDF"
              }
            </PDFDownloadLink>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow max-w-full">
            <table className="w-full divide-y divide-gray-200 table-auto min-w-[600px] sm:min-w-full">
              <thead className="bg-emerald-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {reports.map((report, index) => (
                  <tr
                    key={report.id}
                    className="hover:bg-emerald-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {report.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                      {formatCurrency(report.amount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-500 whitespace-nowrap">
                      {formatDate(report.date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                      {report.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
