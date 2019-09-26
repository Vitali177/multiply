module.exports = function multiply(first, second) {

  function spliceString(start, delCount, newSubStr, string) {
    return string.slice(0, start) + newSubStr + string.slice(start + Math.abs(delCount));
  }
    
  // Каждую цифру бОльшего числа будем умножать на каждую цифру меньшего числа 
  // Первое число будет больше либо таким же  
  
  if ( ( second * 1 ) > ( first * 1 ) ) {
    var buffer = second;
    second = first;
    first = buffer;
  }

  var iBiggerNumber = first.length - 1;
  var iSmallerNumber = second.length - 1;  

  var result = '';
  var iBuff;
  var thisNumber;
  var iPositionForResult = 0;
  
  for (iSmallerNumber; iSmallerNumber >= 0; iSmallerNumber--) {
    for (iBiggerNumber; iBiggerNumber >= 0; iBiggerNumber--) {

      if (result[iPositionForResult] !== undefined) // Если на этом месте, есть уже цифра у результата, то прибавляем и его
        thisNumber = ( first[iBiggerNumber] * second[iSmallerNumber] ) + ( result[iPositionForResult] * 1 ); 
      else thisNumber = first[iBiggerNumber] * second[iSmallerNumber];       

      if (thisNumber < 10) {
        result = spliceString(iPositionForResult, 1, (thisNumber + ''), result);
        iPositionForResult++;
        continue;
      }

      // Если будет несколько раз подряд числа 10+ и мы должны будем двигаться по разрядам, то надо менять индекс для результата, чтобы правильно вписывать цифры в него
      iBuff = iPositionForResult;      
      while (thisNumber >= 10) {      
        result = spliceString(iBuff, 1, (( thisNumber % 10 ) + ''), result);  // Переписываем эту цифру, на остаток 
        iBuff++;   // и двигаемся к следующей разряду

        if (result[iBuff] !== undefined)  // Оставляем целую часть и прибавляем цифру этого разряда
          thisNumber = Math.floor(thisNumber / 10.0) + ( result[iBuff] * 1); 
        else thisNumber = Math.floor(thisNumber / 10.0);       

        if (thisNumber < 10)  // перезаписываем этот разряд, иначе возвращаемся в цикл и записываем уже только остаток от деления на 10      
          result = spliceString(iBuff, 1, (thisNumber + ''), result);
        
      }
      iPositionForResult++;
    }
    iBiggerNumber = first.length - 1;
    iPositionForResult = second.length - iSmallerNumber;   
  } 
  result = result.split('').reverse().join('');    
  return result;  
}