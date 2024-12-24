document.addEventListener('DOMContentLoaded', function() {
    // 调试信息
    console.log('初始化图表...');
    
    // 配置主题
    const theme = {
        color: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'],
        backgroundColor: '#ffffff',
        textStyle: {
            color: '#2c3e50'
        }
    };
    echarts.registerTheme('aiTheme', theme);

    // 获取默认数据（5年）
    const defaultData = getDataByRange('5y');
    console.log('默认数据:', defaultData);

    // 投资趋势图表
    const investmentChart = echarts.init(document.getElementById('investmentChart'), 'aiTheme');
    const investmentOption = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['全球AI投资额', '中国AI投资额']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: defaultData.years
        },
        yAxis: {
            type: 'value',
            name: '投资额（亿美元）'
        },
        series: [
            {
                name: '全球AI投资额',
                type: 'line',
                data: defaultData.global,
                smooth: true,
                symbolSize: 8,
                lineStyle: {
                    width: 4
                }
            },
            {
                name: '中国AI投资额',
                type: 'line',
                data: defaultData.china,
                smooth: true,
                symbolSize: 8,
                lineStyle: {
                    width: 4
                }
            }
        ]
    };
    investmentChart.setOption(investmentOption, true);

    // 市场份额饼图
    const marketShareChart = echarts.init(document.getElementById('marketShareChart'), 'aiTheme');
    const marketShareOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '市场份额',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'outside',
                    formatter: '{b}\n{c}%'
                },
                data: [
                    { value: 35, name: '计算机视觉' },
                    { value: 30, name: '自然语言处理' },
                    { value: 20, name: '机器学习平台' },
                    { value: 15, name: '机器人流程自动化' }
                ]
            }
        ]
    };
    marketShareChart.setOption(marketShareOption);

    // 全球AI人才分布图配置
    const talentMapOption = {
        title: {
            text: '全球AI人才分布热力图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}万人'
        },
        visualMap: {
            min: 0,
            max: 100,
            text: ['高', '低'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['#e0f3f8', '#2980b9']
            }
        },
        series: [
            {
                name: 'AI人才数量',
                type: 'map',
                mapType: 'world',
                roam: true,
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    {name: '中国', value: 85},
                    {name: '美国', value: 100},
                    {name: '印度', value: 45},
                    {name: '英国', value: 30},
                    {name: '德国', value: 25},
                    {name: '日本', value: 20},
                    {name: '加拿大', value: 15},
                    {name: '法国', value: 18},
                    {name: '以色列', value: 12}
                ]
            }
        ]
    };

    // 加载世界地图数据
    const talentMapChart = echarts.init(document.getElementById('talentMapChart'), 'aiTheme');
    console.log('开始加载世界地图数据...');

    fetch('https://fastly.jsdelivr.net/npm/echarts@5.4.3/map/json/world.json')
        .then(response => response.json())
        .then(worldJson => {
            console.log('世界地图数据加载成功');
            echarts.registerMap('world', worldJson);
            talentMapChart.setOption(talentMapOption);
        })
        .catch(error => {
            console.error('加载世界地图数据失败，尝试备用源');
            // 尝试备用CDN
            fetch('https://unpkg.com/echarts@5.4.3/map/json/world.json')
                .then(response => response.json())
                .then(worldJson => {
                    console.log('备用源加载成功');
                    echarts.registerMap('world', worldJson);
                    talentMapChart.setOption(talentMapOption);
                })
                .catch(error => {
                    console.error('备用源也失败，使用简化版显示');
                    console.log('切换到柱状图显示');
                    // 如果地图加载失败，切换到柱状图显示
                    const simpleTalentOption = {
                        title: {
                            text: '全球AI人才分布',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: '{b}: {c}万人'
                        },
                        xAxis: {
                            type: 'category',
                            data: ['美国', '中国', '印度', '英国', '德国', '日本', '加拿大', '法国', '以色列'],
                            axisLabel: {
                                interval: 0,
                                rotate: 45
                            }
                        },
                        yAxis: {
                            type: 'value',
                            name: 'AI人才数量（万人）'
                        },
                        series: [{
                            data: [100, 85, 45, 30, 25, 20, 15, 18, 12],
                            type: 'bar',
                            itemStyle: {
                                borderRadius: [5, 5, 0, 0]
                            }
                        }]
                    };
                    talentMapChart.setOption(simpleTalentOption);
                });
        });

    // 性能提升趋势图
    const performanceChartDom = document.getElementById('performanceChart');
    console.log('性能图表DOM:', performanceChartDom);
    
    if (!performanceChartDom) {
        console.error('找不到性能图表容器');
        return;
    }
    
    const performanceChart = echarts.init(performanceChartDom, 'aiTheme');
    const performanceOption = {
        tooltip: {
            trigger: 'axis',
            formatter: '{b}<br/>{a0}: {c0}%<br/>{a1}: {c1}%'
        },
        legend: {
            data: ['模型准确率', '推理速度']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: defaultData.years
        },
        yAxis: {
            type: 'value',
            name: '相对性能提升（%）',
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [
            {
                name: '模型准确率',
                type: 'bar',
                data: defaultData.accuracy,
                itemStyle: {
                    borderRadius: [5, 5, 0, 0]
                }
            },
            {
                name: '推理速度',
                type: 'bar',
                data: defaultData.speed,
                itemStyle: {
                    borderRadius: [5, 5, 0, 0]
                }
            }
        ]
    };
    performanceChart.setOption(performanceOption, true);

    // 响应式调整
    window.addEventListener('resize', function() {
        investmentChart.resize();
        marketShareChart.resize();
        performanceChart.resize();
        talentMapChart.resize();
    });

    // 时间范围切换功能
    const timeButtons = document.querySelectorAll('.time-btn');
    console.log('找到的时间按钮:', timeButtons.length);
    
    timeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('点击按钮:', this.dataset.range);
            e.preventDefault();  // 防止表单提交
            
            // 移除所有按钮的激活状态
            timeButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的激活状态
            this.classList.add('active');
            
            const range = this.dataset.range;
            const data = getDataByRange(range);
            console.log('切换到的数据:', data);

            // 更新投资趋势图表
            investmentOption.xAxis.data = data.years;
            investmentOption.series[0].data = data.global;
            investmentOption.series[1].data = data.china;
            investmentChart.clear();  // 清除旧的图表
            investmentChart.setOption(investmentOption, true);
            
            // 更新性能提升趋势图表
            performanceOption.xAxis.data = data.years;
            performanceOption.series[0].data = data.accuracy;
            performanceOption.series[1].data = data.speed;
            performanceChart.clear();  // 清除旧的图表
            performanceChart.setOption(performanceOption, true);

            // 强制重新渲染
            requestAnimationFrame(() => {
                investmentChart.resize();
                performanceChart.resize();
            });
        });
    });

    // 初始化完成后强制渲染一次
    requestAnimationFrame(() => {
        investmentChart.resize();
        performanceChart.resize();
    });

    function getDataByRange(range) {
        // 示例数据
        const data = {
            '1y': {
                years: ['2023-Q1', '2023-Q2', '2023-Q3', '2023-Q4'],
                global: [800, 820, 850, 880],
                china: [300, 310, 320, 330],
                accuracy: [210, 215, 218, 220],
                speed: [240, 243, 247, 250]
            },
            '5y': {
                years: ['2019', '2020', '2021', '2022', '2023'],
                global: [368, 425, 680, 720, 850],
                china: [120, 156, 230, 280, 320],
                accuracy: [100, 120, 150, 180, 220],
                speed: [100, 130, 160, 200, 250]
            },
            '10y': {
                years: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
                global: [100, 150, 200, 250, 300, 368, 425, 680, 720, 850],
                china: [30, 50, 70, 90, 100, 120, 156, 230, 280, 320],
                accuracy: [30, 40, 55, 70, 85, 100, 120, 150, 180, 220],
                speed: [25, 35, 50, 65, 80, 100, 130, 160, 200, 250]
            }
        };
        return data[range];
    }
}); 