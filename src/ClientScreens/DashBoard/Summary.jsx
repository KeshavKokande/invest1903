import React from 'react';
import PiChart from './PiChart';
import PlanTable from './PlanTable'; // Assuming PlanTable component is imported from a separate file
import { Flex } from 'antd';

function InvestmentSummary({ transactions, returns }) {
    // Function to calculate total amount invested in each plan
    const calculateTotalInvestment = (transactions) => {
        const investmentMap = new Map();
        transactions.forEach(transaction => {
            const planId = transaction.planId;
            const investedAmount = transaction.investedAmount;
            if (investmentMap.has(planId)) {
                investmentMap.set(planId, investmentMap.get(planId) + investedAmount);
            } else {
                investmentMap.set(planId, investedAmount);
            }
        });
        return investmentMap;
    }

    // Function to calculate total invested amount
    const calculateTotalInvestedAmount = (transactions) => {
        let totalInvestedAmount = 0;
        transactions.forEach(transaction => {
            totalInvestedAmount += transaction.investedAmount;
        });
        return totalInvestedAmount;
    }

    const totalInvestments = calculateTotalInvestment(transactions);
    const totalInvestedAmount = calculateTotalInvestedAmount(transactions);

    // Extracting unique plan IDs
    const uniquePlanIds = [...new Set(returns.map(returns => returns.planId))];

    const totalProfitAmount = returns.reduce((acc, curr) => acc + curr.profit, 0);

    // Calculating total profit for each unique plan ID
    const totalProfits = uniquePlanIds.map(planId => {
        const planProfits = returns.filter(returns => returns.planId === planId);
        const totalProfit = planProfits.reduce((acc, curr) => acc + curr.profit, 0);
        return { name: planId, value: totalProfit };
    });

    // Function to format data for PieChart
    const formatDataForPieChart = (uniquePlans, totalInvestments) => {
        const data = uniquePlans.map(planId => ({
            name: planId,
            value: totalInvestments.get(planId)
        }));
        return data;
    }

    function roundToTwoDecimalPlaces(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    }

    return (
        <div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <p><center><strong>Total Amount Invested:</strong></center><br/> <center>{roundToTwoDecimalPlaces(totalInvestedAmount)}</center></p>
                <p><center><strong>Total Returns:</strong></center><br/><center> {roundToTwoDecimalPlaces(totalProfitAmount)}</center></p>
                <p><center><strong>Current Value:</strong></center><br/> <center>{roundToTwoDecimalPlaces(totalInvestedAmount+totalProfitAmount)}</center></p>
            </div>
            <hr/>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <p><center><strong>Investment</strong></center><br/><PiChart data={formatDataForPieChart(Array.from(new Set(transactions.map(transaction => transaction.planId))), totalInvestments)} /></p>
                <p><center><strong>Returns</strong></center><br/><PiChart data={totalProfits} /></p>
            </div>

            <hr/>


                <center><h3>Plan Information:</h3></center>
                <PlanTable uniquePlans={Array.from(new Set(transactions.map(transaction => transaction.planId)))} totalInvestments={totalInvestments} />

        </div>
    );
}

export default InvestmentSummary;
