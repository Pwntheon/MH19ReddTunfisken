import React, { Component } from 'react';
import Layout from '../../components/layout';
import PerformanceComparison from './charts/performancecomparison';
class Dashboard extends Component { 
    render() {
        const mockPerformance = {
            white: [
                {
                    whom: "me",
                    weight: 14.2
                },
                {
                    whom: "myborough",
                    weight: 16.2
                }
            ],
            blue: [
                {
                    whom: "me",
                    weight: 6
                },
                {
                    whom: "myborough",
                    weight: 8.2
                }
            ],
            green: [
                {
                    whom: "me",
                    weight: 12.9
                },
                {
                    whom: "myborough",
                    weight: 14.6
                }
            ]
        };
        return (
            <Layout>
                Dashboard page - Oppsummering og linker til resten. Burde dette egentlig
                ligge på / ?
                <PerformanceComparison performance={mockPerformance} />
            </Layout>
        );
    }
}

export default Dashboard;
