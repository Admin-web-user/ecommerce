import ChartistGraph from 'react-chartist';

export default function VendorChart({ type = "Bar" }) {
    let data = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [10, 20, 40, 80, 60, 20, 10, 50, 65, 20]
        ],
        fullWidth: true,
    }

    const option = {
        high: 100,
        low: 0,
        axisY: {onlyInteger: true,},
        axisX: {
            labelInterpolationFnc: function (value, index) {
                return index % 2 === 0 ? value : null;
            }
        }
    }
    const responsiveOptions = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
            seriesBarDistance: 10,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value;
                }
            }
        }],
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        }]
    ];

    return (
        <div>
            <ChartistGraph
                responsiveOptions={responsiveOptions}
                data={data}
                options={option}
                type={type}
                className="ct-perfect-fourth" />
        </div>
    )
}
