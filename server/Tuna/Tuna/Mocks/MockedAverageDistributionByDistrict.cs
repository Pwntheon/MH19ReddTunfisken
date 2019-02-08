using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tuna.Models;

namespace Tuna.Mocks
{
    public static class MockedAverageDistributionByDistrict
    {
        public static AverageTrashDistribution GetMockedDistribution(District district)
        {
            var avg = new AverageTrashDistribution
            {
                District = district,
                FoodWaste = 1.5f,
                PlasticWaste = 3f,
                ResidualWaste = 6
            };

            //TODO override some districts to return different results

            switch (district)
            {
                case District.All:
                    break;
                case District.Alna:
                    break;
                case District.Bjerke:
                    break;
                case District.Frogner:
                    break;
                case District.GamleOslo:
                    break;
                case District.Grorud:
                    break;
                case District.Grunerlokka:
                    break;
                case District.NordreAker:
                    break;
                case District.Norstrand:
                    break;
                case District.Sagene:
                    break;
                case District.StHaugen:
                    break;
                case District.Stovner:
                    break;
                case District.SondreNorstrand:
                    break;
                case District.Ullern:
                    break;
                case District.VestreAker:
                    break;
                case District.Ostensjo:
                    break;
            }

            return avg;
        }
    }
}
