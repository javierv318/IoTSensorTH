/*
Incluir librerias:
-Adafruit Unified Sensor by Adafruit
-ArduinoJson by Benoit Blanchon
-DHT Sensor library by Adafruit
-ArduinoHttpClient by Arduino
**Incluir la board de ESP32** para que funcione el TimeStamp
*/
#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <time.h>

//Definir los pines del sensor
#define DHTPIN 4
#define DHTTYPE DHT11

//Inicializar las variables globales
DHT dht(DHTPIN,DHTTYPE);
WiFiClient BClient;

//Inicializar el documento JSON
DynamicJsonDocument doc(1024);
String json;

//Credenciales para conexión de la red.
const char* ssid = "Nonpiracy";
const char* password = "1006010111";
const char* ntpServer = "pool.ntp.org";

//Metodo que agarre el tiempo en un servidor NTP
unsigned long getTime(){
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)){
    return(0);
  }
  time(&now);
  return now;
}

//Metodo para crear el json
void jsonBuilder(float t, float h, long hic){
  doc["timestamp"] = getTime();
  doc["sensorId"] = DHTPIN;
  doc["temperature"] = t;
  doc["humidity"] = h;
  doc["thermalSensation"] = hic;
  serializeJson(doc,json);
}

void lecturaDht(){
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  if (!isnan(t) && !isnan(h)) {
    float hic = dht.computeHeatIndex(t,h,false);
    jsonBuilder(t,h,hic);
  }
}

//Metodo para la conexion de WiFi
void setup_wifi(){
  delay(10);
  //Empezamos la conexion a la red WiFi
  Serial.print("");
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(115200); //Conexion Serial
  setup_wifi(); //Conexion WiFi
  delay(1500);  
  dht.begin();
  configTime(0,0,ntpServer);
}

void loop() {
  json = "";
  lecturaDht();
  Serial.println("dato a enviar: "+ json);
  HTTPClient http; //Declare object of class HTTPClient
  //Specify request destination
  http.begin(BClient, "http://20.84.65.85:3000/datos");
  http.addHeader("Content-Type", "application/json", 0, 0); //Specify contenttype header
  int httpCode = http.POST(json); //Send the request
  String payload = http.getString(); //Get the response payload
  Serial.println(httpCode); //Print HTTP return code
  Serial.println(payload); //Print request response payload
  http.end(); //Close connection
  delay(3500);
}