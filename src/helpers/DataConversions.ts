import {SOTDataPoint, SuccessRate} from '../Types';

export function SOTDataToSuccessRateOfPlan(data: SOTDataPoint[]): SuccessRate[]{
    const total = data.length;
    const success = data.reduce((acc, cur) => acc + (cur.success ? 1:0), 0);
    return [{
        name: 'rate',
        rate: success / total * 100
    }];
}

export function SOTDataToPercentageOfYes(data: SOTDataPoint[]): SuccessRate[]{
    const total = data.length;
    const benYes = data.reduce((acc, cur) => acc + (cur.ben ? 1:0), 0);
    const gregYes = data.reduce((acc, cur) => acc + (cur.greg ? 1:0), 0);
    const jjYes = data.reduce((acc, cur) => acc + (cur.jj ? 1:0), 0);
    const patrickYes = data.reduce((acc, cur) => acc + (cur.patrick ? 1:0), 0);
    return [{
        name: 'Ben',
        rate: benYes / total * 100
    },{
        name: 'Greg',
        rate: gregYes / total * 100
    },{
        name: 'JJ',
        rate: jjYes / total * 100
    },{
        name: 'Patrick',
        rate: patrickYes / total * 100
    }];
}

export function SOTDataToYesPercentageByDay(data) {
    data.forEach(item => {
        const day = new Date(item.proposed).getDay();
        item.dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
    });

    const days = {};
    data.forEach(({dayOfWeek, ben, greg, jj, patrick}) => {
        if (!days[dayOfWeek]) days[dayOfWeek] = { ben: 0, greg: 0, jj: 0, patrick: 0 };
        days[dayOfWeek].ben += ben ? 1 : 0;
        days[dayOfWeek].greg += greg ? 1 : 0;
        days[dayOfWeek].jj += jj ? 1 : 0;
        days[dayOfWeek].patrick += patrick ? 1 : 0;
    });

    const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return dayOrder.map(day => ({
        day,
        Ben: days[day] ? days[day].ben : 0,
        Greg: days[day] ? days[day].greg : 0,
        JJ: days[day] ? days[day].jj : 0,
        Patrick: days[day] ? days[day].patrick : 0,
    }));
}
