import { ScrollView, StyleSheet, Text, View } from 'react-native'

import React from 'react'

const PolicyScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>POLÍTICA DE MANEJO DE INFORMACIÓN Y DATOS PERSONALES DE EQUIPOS DEL NORTE S.A.</Text>
            <Text style={styles.subtitle}>GENERALIDADES</Text>
            <Text style={styles.block}>La presente política se rige de conformidad con la Ley Estatutaria 1581 de 2012, donde se describen las disposiciones generales para la protección de
                datos personales, la cual se desprende de la necesidad de velar por el derecho constitucional consagrado en el artículo 15 de la Constitución Política, de HABEAS DATA. En
                virtud de lo anterior, EQUIPOS DEL NORTE S.A., en adelante “EQUINORTE S.A. ”, es el responsable del tratamiento de datos de carácter personal que sea recolectado por la
                empresa, y por lo tanto, en la presente política se comunican los derechos y las obligaciones pertinentes que establece dicha normatividad. </Text>
            <Text style={styles.block}>El derecho al HABEAS DATA consiste en la posibilidad que tiene cada persona de conocer, actualizar y rectificar las informaciones contenidas
                sobre sí en las bases de datos, de naturaleza pública o privada y otorga la facultad al titular de los datos personales, de exigir a las administradoras de datos personales
                el acceso, inclusión, exclusión, corrección, adición, actualización, y certificación de los datos, así como la limitación en las posibilidades de divulgación, publicación
                o cesión de los mismos, conforme a los principios que informan el proceso de administración de bases de datos personales.</Text>
            <Text style={styles.block}>Por consiguiente, EQUINORTE S.A. se compromete a respetar y velar por la información que sea recaudada por el mismo, teniendo en cuenta que,
                para el desarrollo de su objeto social, recopila y lleva a cabo tratamientos de bases de datos tanto de clientes, proveedores, aliados comerciales y empleados.</Text>
            <Text style={styles.block}>EQUINORTE S.A. se encuentra obligado a proteger y respetar el derecho a la privacidad de las personas, así como la facultad de conocer, actualizar o solicitar la información que sobre ellas se archive en bases de datos.</Text>
            <Text style={styles.block}>Por lo tanto, EQUINORTE S.A.  ha diseñado la presente política de manejo de la información de carácter personal y bases de datos en la cual se describe y explica el tratamiento de la Información Personal a la que tiene acceso a  través  de  nuestro  sitio  web, correo  electrónico, información física, mensajes de texto, mensaje de voz, llamadas telefónicas, información biométrica, medios físicos o electrónicos, actuales o que en el futuro se desarrollen como otras comunicaciones enviadas así como por intermedio de terceros que participan en nuestra relación comercial o legal con todos nuestros clientes, proveedores y empleados.</Text>
            <Text style={styles.block}>La presente Política se irá ajustando en la medida en que se de acuerdo a las modificaciones en la norma expuesta y la jurisprudencia: </Text>
            <Text style={styles.subtitle}>* INFORMACIÓN SOLICITADA Y QUE SE MANEJA</Text>
            <Text style={styles.block}>Los datos personales que recolectamos, de clientes, proveedores y empleados, son:</Text>
            <Text>1. Tipo y número de documento de identificación (Cédula de ciudadanía o extranjería, o, NIT).</Text>
            <Text>2. Nombres y Apellidos / Razón Social.</Text>
            <Text>3. Información Tributaria</Text>
            <Text>4. Información Financiera.</Text>
            <Text>5. Teléfonos fijos y/o celulares de contacto</Text>
            <Text>6. Direcciones (Domicilio principal, lugar de obra, entre otros)</Text>
            <Text>7. Correo electrónico</Text>
            <Text>8. Información sobre recepción del producto (Días, horarios, Fecha de Factura y todo los relacionado con solicitudes especiales para la entrega oportuna del producto).</Text>
            <Text>9. Información de pagos y radicación de facturas</Text>
            <Text>10. Referencias Bancarias</Text>
            <Text>11. Referencias Comerciales</Text>
            <Text>12. Autorización para reportar, procesar, consultar información de y para centrales de riesgo.</Text>
            <Text style={styles.subtitle}>* FINALIDAD USO DE LA INFORMACIÓN SOLICITADA</Text>
            <Text style={styles.block}>Se autoriza a EQUINORTE S.A.  a usar la anterior información, recolectar, transferir, tratar, administrar y suprimir datos personales en nuestras bases de datos. El objetivo del uso de los datos es recolectar todos los datos necesarios para la prestación de nuestros servicios, entrega de equipos/maquinaria, estudio de créditos, registros contables, fines tributarios, administrativos, contables y comerciales, necesarios para el desarrollo de nuestro objeto social. </Text>
            <Text style={styles.block}>De igual manera, los titulares de los datos personales, al aceptar esta política, autorizan a EQUINORTE S.A.  para:</Text>
            <Text>1 .Ordenar, catalogar, clasificar, dividir o separar la información suministrada.</Text>
            <Text>2. Utilizarlos para fines administrativos internos o comerciales tales como: estudios de crédito, elaboración y presentación de cotizaciones, referencias comerciales, realización de encuestas sobre satisfacción, realización de pagos o de cobros por parte de la empresa.</Text>
            <Text>3. Promoción de productos o servicios de la empresa.</Text>
            <Text>4. Envío de información de interés a través de correo electrónico u otros medios.</Text>
            <Text>5. Conservar registros históricos de la compañía y mantener contacto con los titulares del dato.</Text>
            <Text>6. Verificar, comprobar o validar los datos suministrados.</Text>
            <Text>7. Estudiar y analizar la información entregada para el seguimiento y mejoramiento del servicio y la atención.</Text>
            <Text>8. Entregar la información recolectada a terceros con los que la compañía contrate el almacenamiento y administración de los datos personales, bajo los estándares de seguridad y confidencialidad a los cuales estamos obligados.</Text>
            <Text>9. Controlar y prevenir fraudes.</Text>
            <Text>10. Controlar y prevenir lavado de activos y financiación del terrorismo.</Text>
            <Text>11. Revisar y elaborar reportes a centrales de riesgo, de las obligaciones financieras derivadas de la relación comercial (Información positiva y/o negativa), respetando las disposiciones legales frente a esta materia. </Text>
            <Text style={styles.subtitle}>* USO DE LA INFORMACIÓN RECOLECTADA</Text>
            <Text style={styles.block}>EQUINORTE S.A. podrá suministrar la información personal recolectada, cuando considere, que esa divulgación sea necesaria para:</Text>
            <Text>Evitar una responsabilidad legal.</Text>
            <Text>Cumplir con leyes, normativas, citaciones u órdenes judiciales.</Text>
            <Text>Cumplir un requerimiento de una autoridad gubernamental o reguladora.</Text>
            <Text>Ejercer derechos o cumplir obligaciones en el marco de la relación contractual o de los deberes legales de la empresa.</Text>
            <Text style={styles.block}>Lo anterior, respetando la normatividad vigente en materia de protección  de datos personales.</Text>
            <Text style={styles.subtitle}>* DERECHOS DE LOS TITULARES DE LA INFORMACIÓN</Text>
            <Text style={styles.block}>Los titulares de la información tienen derecho a acceder, consultar y conocer los datos personales que se encuentren en nuestra base de datos, así como rectificarlos en caso de ser inexactos o incompletos, y a cancelarlos cuando lo decidan.</Text>
            <Text style={styles.block}>Además, tendrán derecho, en los términos de la Ley 1581 de 2012, a:</Text>
            <Text>1. Conocer, actualizar y rectificar sus datos personales frente a los responsables del tratamiento o encargados del tratamiento. Este derecho se podrá ejercer, entre otros frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o aquellos cuyo Tratamiento esté expresamente prohibido o no haya sido autorizado.</Text>
            <Text>2. Solicitar prueba de la autorización otorgada al responsable del tratamiento salvo cuando expresamente se exceptúe como requisito para el tratamiento, de conformidad con lo previsto en el artículo 10 de la Ley 1581 de 2012.</Text>
            <Text>3. Ser informado por el responsable del tratamiento o el encargado del tratamiento, previa solicitud, respecto del uso que les ha dado a sus datos personales.</Text>
            <Text>4. Presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a lo dispuesto en la presente ley y las demás normas que la modifiquen, adicionen o complementen.</Text>
            <Text>5. Revocar la autorización y/o solicitar la supresión del dato cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales. La revocatoria y/o supresión procederá cuando la Superintendencia de Industria y</Text>
            <Text style={styles.block}>Comercio haya determinado que en el tratamiento el responsable o encargado han incurrido en conductas contrarias a la ley y a la Constitución.</Text>
            <Text>1. Revocar la autorización y/o solicitar la supresión del dato en cualquier momento, siempre y cuando el titular no tenga el deber legal o contractual de permanecer en la base de datos o archivo de EQUINORTE S.A. .</Text>
            <Text>2. Acceder en forma gratuita a sus datos personales que hayan sido objeto de tratamiento.</Text>
            <Text style={styles.subtitle}>* PERSONAS LEGITIMADAS PARA EJERCER LOS DERECHOS</Text>
            <Text style={styles.block}>De acuerdo con el artículo 20 del Decreto 1377 de 2013, están legitimadas para ejercer los derechos, las siguientes personas, siempre que las mismas acrediten su identidad y la calidad en la que actúan:</Text>
            <Text>1. El titular</Text>
            <Text>2. Los causahabientes del titular</Text>
            <Text>3. El representante y/o apoderado del titular</Text>
            <Text>4. Quienes actúen por estipulación a favor de otro o para otro.</Text>

            <Text style={styles.subtitle}>* PERSONAL DE LA EMPRESA PARA SOLICITAR INFORMACION O RESOLVER INQUIETUDES</Text>
            <Text style={styles.block}>Todos los titulares de datos personales (clientes, proveedores, empleados, etc): Pueden contactar al área encargada de la atención de peticiones, consultas y reclamos por medio de correo electrónico, escribiendo a conecta2@equinorte.net, telefónicamente llamando a nuestra central telefónica (605)3853003 o a través de comunicación escrita dirigida a la siguiente dirección: Av Circunvalar Calle 110 N 6qsn 522 Lote 19 Barranquilla 080001 Colombia.</Text>
            <Text style={styles.block}>Para ejercer sus derechos a conocer, actualizar, rectificar y suprimir información y revocar la autorización, se deberá contactar a través de los canales descritos el punto anterior; indicando lo siguiente:</Text>
            <Text>1. Nombres y apellidos</Text>
            <Text>2. Tipo y número de documento de identificación Cargo / Ocupación</Text>
            <Text>3. Asunto: Base de Datos</Text>

            <Text style={styles.subtitle}>* PROCEDIMIENTO PARA RECLAMACION</Text>
            <Text style={styles.block}>De acuerdo con lo establecido en los artículos 14 y 15 de la Ley 1581 de 2012, usted tiene derecho a formular consultas y reclamos, caso en el cual se llevara a cabo el procedimiento que se explica a continuación.</Text>
            <Text style={styles.block}>Las consultas/reclamos/peticiones serán atendidas en un término máximo de quince (15) días hábiles contados a partir del día siguiente del recibo de las mismas. En caso de no dar respuesta en el término previsto, se informará al interesado, indicando las causas por las cuales se ha presentado el retraso y señalando la fecha en que su consulta y/o petición será resuelta.</Text>
            <Text style={styles.block}>En caso de tratarse de un reclamo o petición se debe incluir como mínimo:</Text>
            <Text>1. Identificación</Text>
            <Text>2. Hechos que dan lugar a la solicitud</Text>
            <Text>3. Dirección</Text>
            <Text>4. Los documentos que quiera hacer valer</Text>
            <Text style={styles.block}>En caso de requerir mayor información para dar respuesta a la solicitud, se requerirá al interesado para que dentro de los cinco (5) días siguientes a la recepción del reclamo, de respuesta a lo solicitado por EQUINORTE S.A. Transcurridos quince (15) días desde la respuesta solicitando mayor información, sin que el solicitante de respuesta, se entenderá que como desistido la reclamación y deberá radicar una nueva. </Text>
            <Text style={styles.block}>En caso de dar respuesta, recibida la misma, atender el reclamo será de quince (15) días hábiles contados a partir del día siguiente a la fecha de su recibo. Cuando no fuere posible atender el reclamo dentro de dicho término, se informará al interesado los motivos de la demora y la fecha en que se atenderá su reclamo. </Text>
            <Text style={styles.block}>En caso de requerir información adicional, se deberá contactar a los canales de contacto establecidos en el numeral 6. </Text>
        </ScrollView>
    )
}

export default PolicyScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        flex: 1,

    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 5
    },
    subtitle: {
        fontWeight: "bold",
        fontSize: 16,
        paddingVertical: 10
    },
    block: {
        paddingVertical: 5
    }
})