import React, { ReactElement, useEffect, useRef, useState } from 'react'

const Delivery: React.FC = () => {

    return (
        <div>
            <div>
                Способы доставки и самовывоза
            </div>
            <div>
                Обработка заказа
            </div>
            <div>
                Обратите внимание, что после размещения ваш заказ поступает в обработку. Обработка заказа занимает в среднем 3 часа и не может занимать более 24 часов с момента размещения заказа. Дополнительное время может потребоваться в период распродаж и нерабочих/праздничных дней. В процессе обработки заказа с вами свяжется наш менеджер для уточнения деталей заказа.
            </div>
            <div>
                Доставка по Москве и Московской области
            </div>
            <div>
                По Москве и Московской Области осуществляется адресная доставка курьерской службой. Сроки и стоимость доставки рассчитываются автоматически на этапе оформления заказа.

                Предпочтительное время доставки можно согласовать с нашим менеджером, позвонив нам по телефону +7(995)788-00-58.

                Для Москвы и Московской области доступна примерка и оплата наличными при получении. В рамках стоимости одной доставки можно заказать и примерить до 2 пар включительно, доставка для примерки каждой следующей пары будет стоить еще 500 рублей. Примерка осуществляется исключительно в присутствии курьера магазина. На примерку отводится не более 15 минут.

                При заказе услуги на доставку с примеркой более 2 пар счёт, выставленный за услугу, должен быть оплачен заблаговременно.

                В случае полного отказа от заказа стоимость доставки клиенту не возвращается.
            </div>

            <div>
                Доставка по России
            </div>
            <div>
                Доставка по России производится по 100% предоплате и осуществляется курьерской службой СДЭК до указанного адреса. Сроки и стоимость доставки рассчитываются индивидуально и автоматически на этапе оформления заказа.

                Обратите внимание, что отправка заказов производится ежедневно, за исключением праздничных и нерабочих дней.

                О прибытии посылки вас должен уведомить оператор курьерской службы. Если срок доставки вашего заказа истекает, пожалуйста, обратитесь в курьерскую службу СДЭК или свяжитесь с нами.
            </div>
        </div>

    )
}


export default Delivery