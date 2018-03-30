export interface IFormatDate {
  day: string;
  date: Date;
}

export const formatDate = (date: string): IFormatDate => {
  const parts = date.split(' ');
  const formated: IFormatDate = {
    day: '',
    date: new Date(),
  };

  switch (parts[0]) {
    case '7':
      formated.day = 'Sunday';
      break;
    case '6':
      formated.day = 'Saturday';
      break;
    case '5':
      formated.day = 'Friday';
      break;
    case '4':
      formated.day = 'Thursday';
      break;
    case '3':
      formated.day = 'Wednesday';
      break;
    case '2':
      formated.day = 'Tuesday';
      break;
    case '1':
      formated.day = 'Monday';
  }

  formated.date = new Date(`${parts[1]} ${parts[2]} ${parts[3]} ${parts[4]}`);

  return formated;
};

export const numToWeekDay = (day: number): string => {
  switch (day) {
    case 6:
      return 'Sunday';
    case 5:
      return 'Saturday';
    case 4:
      return 'Friday';
    case 3:
      return 'Thursday';
    case 2:
      return 'Wednesday';
    case 1:
      return 'Tuesday';
    case 0:
      return 'Monday';
    default:
      return '';
  }
};

export const numToMonth = (day: number): string => {
  switch (day) {
    case 11:
      return 'December';
    case 10:
      return 'November';
    case 9:
      return 'October';
    case 8:
      return 'September';
    case 7:
      return 'August';
    case 6:
      return 'July';
    case 5:
      return 'June';
    case 4:
      return 'May';
    case 3:
      return 'April';
    case 2:
      return 'March';
    case 1:
      return 'February';
    case 0:
      return 'January';
    default:
      return '';
  }
};
