import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Platform
} from "react-native";
import * as ImagePicker from 'expo-image-picker';


const ProductItem = ({ item, onDelete }) => (
  <View style={styles.itemContainer}>
    <Text>Ürün Adı: {item.name}</Text>
    <Text>Ebat: {item.size}</Text>
    <Text>Satış Fiyatı: {item.salePrice}</Text>
    <Text>Alış Fiyatı: {item.purchasePrice}</Text>
    <Text>Stok Adeti: {item.stock}</Text>
    <Text>Marka: {item.brand}</Text>
    <Text>Uyumlu Arabalar: {item.compatibleCars}</Text>
    <Text>Raf Kodu: {item.shelfCode}</Text>
    <Text>Resim URL: {item.image}</Text>
    <Button title="Sil" onPress={onDelete} />
  </View>
);

export default function App() {
  const [name, setName] = useState('-');
  const [size, setSize] = useState('-');
  const [salePrice, setSalePrice] = useState('1');
  const [purchasePrice, setPurchasePrice] = useState('1');
  const [stock, setStock] = useState('1');
  const [brand, setBrand] = useState('-');
  const [compatibleCars, setCompatibleCars] = useState('-');
  const [shelfCode, setShelfCode] = useState('-');
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);

  const resimCek = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage("base64," + result.base64);
    }
  };

  

  const addProduct = () => {
    setProducts([
      ...products,
      {
        name,
        size,
        salePrice,
        purchasePrice,
        stock,
        brand,
        compatibleCars,
        shelfCode,
        image,
      },
    ]);
    setName("-");
    setSize("-");
    setSalePrice("1");
    setPurchasePrice("1");
    setStock("1");
    setBrand("-");
    setCompatibleCars("-");
    setShelfCode("-");
  };
  
  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text>Ürün Adı</Text>
      <TextInput placeholder="Ürün Adı" value={name} onChangeText={setName} />
      <Text>Ebat</Text>
      <TextInput placeholder="Ebat" value={size} onChangeText={setSize} />
      <Text>Satış Fiyatı</Text>
      <TextInput
        placeholder="Satış Fiyatı"
        value={salePrice}
        onChangeText={setSalePrice}
        keyboardType="numeric"
      />
      <Text>Alış Fiyatı</Text>
      <TextInput
        placeholder="Alış Fiyatı"
        value={purchasePrice}
        onChangeText={setPurchasePrice}
        keyboardType="numeric"
      />
      <Text>Stok Adeti</Text>
      <TextInput
        placeholder="Stok Adeti"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />
      <Text>Marka</Text>
      <TextInput placeholder="Marka" value={brand} onChangeText={setBrand} />
      <Text>Uyumlu Arabalar</Text>
      <TextInput
        placeholder="Uyumlu Arabalar"
        value={compatibleCars}
        onChangeText={setCompatibleCars}
      />
      <Text>Raf Kodu</Text>
      <TextInput
        placeholder="Raf Kodu"
        value={shelfCode}
        onChangeText={setShelfCode}
      />
      <Text>Resim URL</Text>
      <Button title="Take a photo" onPress={resimCek} />
      <Button title="Ürün Ekle" onPress={addProduct} />
      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          console.log(item),
          <ProductItem item={item} onDelete={() => deleteProduct(index)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
