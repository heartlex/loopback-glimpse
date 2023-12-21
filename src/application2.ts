const getRandomInt = async () => {
  const value = parseInt((Math.random() * 10).toFixed(0));

  // reject if the `value` is `0`
  if( value === 0 ) {
      throw new Error( 'Can\'t work with 0 :/' );
  }

  return value;
};

const isEven = async ( answer: boolean ) => {
  try {
      const value = await getRandomInt();
      const isEvenValue = value % 2 === 0;
      return isEvenValue === answer;
  } catch( e ) {
      console.log( 'getRandomInt rejection:', e.message );
      return false; // return `false` deliberately
  }
};

const resolveFunction1 = (value: boolean): void => {
  // (parameter) value: boolean
  console.log(
    value === true ? 'lucky :)' : 'unlucky :('
  );
};
const rejectFunction1 = (error: Error) => {
  console.log('Rejected:', error.message);
};

// listen to promise resolution
isEven( true )
  .then( resolveFunction1 )
  .catch( rejectFunction1 )
  .finally( () => {
  console.log( 'Completed!' );
} );
