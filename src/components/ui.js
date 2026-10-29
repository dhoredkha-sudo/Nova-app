import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useApp } from '../context/AppContext';
export function Card({ children, style }) { const { theme } = useApp(); return <View style={[{ backgroundColor: theme.elevated, borderColor: theme.border, borderWidth: 1, borderRadius: 16, padding: 16 }, style]}>{children}</View>; }
export function Title({ children, style }) { const { theme } = useApp(); return <Text style={[{ color: theme.text, fontSize: 22, fontWeight: '800' }, style]}>{children}</Text>; }
export function Sub({ children, style }) { const { theme } = useApp(); return <Text style={[{ color: theme.muted, fontSize: 14, lineHeight: 20 }, style]}>{children}</Text>; }
export function Btn({ title, onPress, variant }) { const { theme } = useApp(); return <TouchableOpacity onPress={onPress} style={{ backgroundColor: variant === 'ghost' ? 'transparent' : theme.primary, borderWidth: variant === 'ghost' ? 1 : 0, borderColor: theme.border, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center', marginVertical: 4 }}><Text style={{ color: variant === 'ghost' ? theme.text : '#030806', fontWeight: '800' }}>{title}</Text></TouchableOpacity>; }
export function Input({ value, onChangeText, placeholder, secure, keyboardType }) { const { theme } = useApp(); return <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} secureTextEntry={secure} keyboardType={keyboardType} placeholderTextColor={theme.muted} style={{ backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: 12, padding: 12, color: theme.text, marginVertical: 6 }} />; }
export function Progress({ value }) { const { theme } = useApp(); return <View style={{ height: 8, backgroundColor: theme.surface, borderRadius: 99, overflow: 'hidden', marginVertical: 8 }}><View style={{ width: `${Math.round(value*100)}%`, height: 8, backgroundColor: theme.primary }} /></View>; }
export function Empty({ text }) { const { theme } = useApp(); return <Card><Sub>{text}</Sub></Card>; }
export const styles = StyleSheet.create({ screen: { flex: 1, padding: 16 } });
